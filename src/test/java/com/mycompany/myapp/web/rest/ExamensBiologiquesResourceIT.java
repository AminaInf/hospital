package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.HospitalApp;
import com.mycompany.myapp.domain.ExamensBiologiques;
import com.mycompany.myapp.repository.ExamensBiologiquesRepository;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ExamensBiologiquesResource} REST controller.
 */
@SpringBootTest(classes = HospitalApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ExamensBiologiquesResourceIT {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_TEXTE = "AAAAAAAAAA";
    private static final String UPDATED_TEXTE = "BBBBBBBBBB";

    @Autowired
    private ExamensBiologiquesRepository examensBiologiquesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restExamensBiologiquesMockMvc;

    private ExamensBiologiques examensBiologiques;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExamensBiologiques createEntity(EntityManager em) {
        ExamensBiologiques examensBiologiques = new ExamensBiologiques()
            .date(DEFAULT_DATE)
            .texte(DEFAULT_TEXTE);
        return examensBiologiques;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExamensBiologiques createUpdatedEntity(EntityManager em) {
        ExamensBiologiques examensBiologiques = new ExamensBiologiques()
            .date(UPDATED_DATE)
            .texte(UPDATED_TEXTE);
        return examensBiologiques;
    }

    @BeforeEach
    public void initTest() {
        examensBiologiques = createEntity(em);
    }

    @Test
    @Transactional
    public void createExamensBiologiques() throws Exception {
        int databaseSizeBeforeCreate = examensBiologiquesRepository.findAll().size();
        // Create the ExamensBiologiques
        restExamensBiologiquesMockMvc.perform(post("/api/examens-biologiques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(examensBiologiques)))
            .andExpect(status().isCreated());

        // Validate the ExamensBiologiques in the database
        List<ExamensBiologiques> examensBiologiquesList = examensBiologiquesRepository.findAll();
        assertThat(examensBiologiquesList).hasSize(databaseSizeBeforeCreate + 1);
        ExamensBiologiques testExamensBiologiques = examensBiologiquesList.get(examensBiologiquesList.size() - 1);
        assertThat(testExamensBiologiques.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testExamensBiologiques.getTexte()).isEqualTo(DEFAULT_TEXTE);
    }

    @Test
    @Transactional
    public void createExamensBiologiquesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = examensBiologiquesRepository.findAll().size();

        // Create the ExamensBiologiques with an existing ID
        examensBiologiques.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExamensBiologiquesMockMvc.perform(post("/api/examens-biologiques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(examensBiologiques)))
            .andExpect(status().isBadRequest());

        // Validate the ExamensBiologiques in the database
        List<ExamensBiologiques> examensBiologiquesList = examensBiologiquesRepository.findAll();
        assertThat(examensBiologiquesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllExamensBiologiques() throws Exception {
        // Initialize the database
        examensBiologiquesRepository.saveAndFlush(examensBiologiques);

        // Get all the examensBiologiquesList
        restExamensBiologiquesMockMvc.perform(get("/api/examens-biologiques?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(examensBiologiques.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].texte").value(hasItem(DEFAULT_TEXTE)));
    }
    
    @Test
    @Transactional
    public void getExamensBiologiques() throws Exception {
        // Initialize the database
        examensBiologiquesRepository.saveAndFlush(examensBiologiques);

        // Get the examensBiologiques
        restExamensBiologiquesMockMvc.perform(get("/api/examens-biologiques/{id}", examensBiologiques.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(examensBiologiques.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.texte").value(DEFAULT_TEXTE));
    }
    @Test
    @Transactional
    public void getNonExistingExamensBiologiques() throws Exception {
        // Get the examensBiologiques
        restExamensBiologiquesMockMvc.perform(get("/api/examens-biologiques/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExamensBiologiques() throws Exception {
        // Initialize the database
        examensBiologiquesRepository.saveAndFlush(examensBiologiques);

        int databaseSizeBeforeUpdate = examensBiologiquesRepository.findAll().size();

        // Update the examensBiologiques
        ExamensBiologiques updatedExamensBiologiques = examensBiologiquesRepository.findById(examensBiologiques.getId()).get();
        // Disconnect from session so that the updates on updatedExamensBiologiques are not directly saved in db
        em.detach(updatedExamensBiologiques);
        updatedExamensBiologiques
            .date(UPDATED_DATE)
            .texte(UPDATED_TEXTE);

        restExamensBiologiquesMockMvc.perform(put("/api/examens-biologiques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedExamensBiologiques)))
            .andExpect(status().isOk());

        // Validate the ExamensBiologiques in the database
        List<ExamensBiologiques> examensBiologiquesList = examensBiologiquesRepository.findAll();
        assertThat(examensBiologiquesList).hasSize(databaseSizeBeforeUpdate);
        ExamensBiologiques testExamensBiologiques = examensBiologiquesList.get(examensBiologiquesList.size() - 1);
        assertThat(testExamensBiologiques.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testExamensBiologiques.getTexte()).isEqualTo(UPDATED_TEXTE);
    }

    @Test
    @Transactional
    public void updateNonExistingExamensBiologiques() throws Exception {
        int databaseSizeBeforeUpdate = examensBiologiquesRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExamensBiologiquesMockMvc.perform(put("/api/examens-biologiques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(examensBiologiques)))
            .andExpect(status().isBadRequest());

        // Validate the ExamensBiologiques in the database
        List<ExamensBiologiques> examensBiologiquesList = examensBiologiquesRepository.findAll();
        assertThat(examensBiologiquesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExamensBiologiques() throws Exception {
        // Initialize the database
        examensBiologiquesRepository.saveAndFlush(examensBiologiques);

        int databaseSizeBeforeDelete = examensBiologiquesRepository.findAll().size();

        // Delete the examensBiologiques
        restExamensBiologiquesMockMvc.perform(delete("/api/examens-biologiques/{id}", examensBiologiques.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ExamensBiologiques> examensBiologiquesList = examensBiologiquesRepository.findAll();
        assertThat(examensBiologiquesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
