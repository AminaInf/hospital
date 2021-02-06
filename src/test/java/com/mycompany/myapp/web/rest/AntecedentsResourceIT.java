package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.HospitalApp;
import com.mycompany.myapp.domain.Antecedents;
import com.mycompany.myapp.repository.AntecedentsRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AntecedentsResource} REST controller.
 */
@SpringBootTest(classes = HospitalApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AntecedentsResourceIT {

    private static final String DEFAULT_MEDICAUX = "AAAAAAAAAA";
    private static final String UPDATED_MEDICAUX = "BBBBBBBBBB";

    private static final String DEFAULT_CHIRURGICAUX = "AAAAAAAAAA";
    private static final String UPDATED_CHIRURGICAUX = "BBBBBBBBBB";

    private static final String DEFAULT_FAMILIAUX = "AAAAAAAAAA";
    private static final String UPDATED_FAMILIAUX = "BBBBBBBBBB";

    private static final String DEFAULT_ALERGIE_INTOLERANCE = "AAAAAAAAAA";
    private static final String UPDATED_ALERGIE_INTOLERANCE = "BBBBBBBBBB";

    @Autowired
    private AntecedentsRepository antecedentsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAntecedentsMockMvc;

    private Antecedents antecedents;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Antecedents createEntity(EntityManager em) {
        Antecedents antecedents = new Antecedents()
            .medicaux(DEFAULT_MEDICAUX)
            .chirurgicaux(DEFAULT_CHIRURGICAUX)
            .familiaux(DEFAULT_FAMILIAUX)
            .alergieIntolerance(DEFAULT_ALERGIE_INTOLERANCE);
        return antecedents;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Antecedents createUpdatedEntity(EntityManager em) {
        Antecedents antecedents = new Antecedents()
            .medicaux(UPDATED_MEDICAUX)
            .chirurgicaux(UPDATED_CHIRURGICAUX)
            .familiaux(UPDATED_FAMILIAUX)
            .alergieIntolerance(UPDATED_ALERGIE_INTOLERANCE);
        return antecedents;
    }

    @BeforeEach
    public void initTest() {
        antecedents = createEntity(em);
    }

    @Test
    @Transactional
    public void createAntecedents() throws Exception {
        int databaseSizeBeforeCreate = antecedentsRepository.findAll().size();
        // Create the Antecedents
        restAntecedentsMockMvc.perform(post("/api/antecedents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(antecedents)))
            .andExpect(status().isCreated());

        // Validate the Antecedents in the database
        List<Antecedents> antecedentsList = antecedentsRepository.findAll();
        assertThat(antecedentsList).hasSize(databaseSizeBeforeCreate + 1);
        Antecedents testAntecedents = antecedentsList.get(antecedentsList.size() - 1);
        assertThat(testAntecedents.getMedicaux()).isEqualTo(DEFAULT_MEDICAUX);
        assertThat(testAntecedents.getChirurgicaux()).isEqualTo(DEFAULT_CHIRURGICAUX);
        assertThat(testAntecedents.getFamiliaux()).isEqualTo(DEFAULT_FAMILIAUX);
        assertThat(testAntecedents.getAlergieIntolerance()).isEqualTo(DEFAULT_ALERGIE_INTOLERANCE);
    }

    @Test
    @Transactional
    public void createAntecedentsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = antecedentsRepository.findAll().size();

        // Create the Antecedents with an existing ID
        antecedents.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAntecedentsMockMvc.perform(post("/api/antecedents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(antecedents)))
            .andExpect(status().isBadRequest());

        // Validate the Antecedents in the database
        List<Antecedents> antecedentsList = antecedentsRepository.findAll();
        assertThat(antecedentsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAntecedents() throws Exception {
        // Initialize the database
        antecedentsRepository.saveAndFlush(antecedents);

        // Get all the antecedentsList
        restAntecedentsMockMvc.perform(get("/api/antecedents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(antecedents.getId().intValue())))
            .andExpect(jsonPath("$.[*].medicaux").value(hasItem(DEFAULT_MEDICAUX)))
            .andExpect(jsonPath("$.[*].chirurgicaux").value(hasItem(DEFAULT_CHIRURGICAUX)))
            .andExpect(jsonPath("$.[*].familiaux").value(hasItem(DEFAULT_FAMILIAUX)))
            .andExpect(jsonPath("$.[*].alergieIntolerance").value(hasItem(DEFAULT_ALERGIE_INTOLERANCE)));
    }
    
    @Test
    @Transactional
    public void getAntecedents() throws Exception {
        // Initialize the database
        antecedentsRepository.saveAndFlush(antecedents);

        // Get the antecedents
        restAntecedentsMockMvc.perform(get("/api/antecedents/{id}", antecedents.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(antecedents.getId().intValue()))
            .andExpect(jsonPath("$.medicaux").value(DEFAULT_MEDICAUX))
            .andExpect(jsonPath("$.chirurgicaux").value(DEFAULT_CHIRURGICAUX))
            .andExpect(jsonPath("$.familiaux").value(DEFAULT_FAMILIAUX))
            .andExpect(jsonPath("$.alergieIntolerance").value(DEFAULT_ALERGIE_INTOLERANCE));
    }
    @Test
    @Transactional
    public void getNonExistingAntecedents() throws Exception {
        // Get the antecedents
        restAntecedentsMockMvc.perform(get("/api/antecedents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAntecedents() throws Exception {
        // Initialize the database
        antecedentsRepository.saveAndFlush(antecedents);

        int databaseSizeBeforeUpdate = antecedentsRepository.findAll().size();

        // Update the antecedents
        Antecedents updatedAntecedents = antecedentsRepository.findById(antecedents.getId()).get();
        // Disconnect from session so that the updates on updatedAntecedents are not directly saved in db
        em.detach(updatedAntecedents);
        updatedAntecedents
            .medicaux(UPDATED_MEDICAUX)
            .chirurgicaux(UPDATED_CHIRURGICAUX)
            .familiaux(UPDATED_FAMILIAUX)
            .alergieIntolerance(UPDATED_ALERGIE_INTOLERANCE);

        restAntecedentsMockMvc.perform(put("/api/antecedents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAntecedents)))
            .andExpect(status().isOk());

        // Validate the Antecedents in the database
        List<Antecedents> antecedentsList = antecedentsRepository.findAll();
        assertThat(antecedentsList).hasSize(databaseSizeBeforeUpdate);
        Antecedents testAntecedents = antecedentsList.get(antecedentsList.size() - 1);
        assertThat(testAntecedents.getMedicaux()).isEqualTo(UPDATED_MEDICAUX);
        assertThat(testAntecedents.getChirurgicaux()).isEqualTo(UPDATED_CHIRURGICAUX);
        assertThat(testAntecedents.getFamiliaux()).isEqualTo(UPDATED_FAMILIAUX);
        assertThat(testAntecedents.getAlergieIntolerance()).isEqualTo(UPDATED_ALERGIE_INTOLERANCE);
    }

    @Test
    @Transactional
    public void updateNonExistingAntecedents() throws Exception {
        int databaseSizeBeforeUpdate = antecedentsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAntecedentsMockMvc.perform(put("/api/antecedents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(antecedents)))
            .andExpect(status().isBadRequest());

        // Validate the Antecedents in the database
        List<Antecedents> antecedentsList = antecedentsRepository.findAll();
        assertThat(antecedentsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAntecedents() throws Exception {
        // Initialize the database
        antecedentsRepository.saveAndFlush(antecedents);

        int databaseSizeBeforeDelete = antecedentsRepository.findAll().size();

        // Delete the antecedents
        restAntecedentsMockMvc.perform(delete("/api/antecedents/{id}", antecedents.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Antecedents> antecedentsList = antecedentsRepository.findAll();
        assertThat(antecedentsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
