package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.HospitalApp;
import com.mycompany.myapp.domain.RendezVous;
import com.mycompany.myapp.repository.RendezVousRepository;

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
 * Integration tests for the {@link RendezVousResource} REST controller.
 */
@SpringBootTest(classes = HospitalApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RendezVousResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final Integer DEFAULT_AGE = 1;
    private static final Integer UPDATED_AGE = 2;

    private static final String DEFAULT_CNI = "AAAAAAAAAAAAA";
    private static final String UPDATED_CNI = "BBBBBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_HEURE = "AAAAAAAAAA";
    private static final String UPDATED_HEURE = "BBBBBBBBBB";

    @Autowired
    private RendezVousRepository rendezVousRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRendezVousMockMvc;

    private RendezVous rendezVous;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RendezVous createEntity(EntityManager em) {
        RendezVous rendezVous = new RendezVous()
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .age(DEFAULT_AGE)
            .cni(DEFAULT_CNI)
            .telephone(DEFAULT_TELEPHONE)
            .date(DEFAULT_DATE)
            .heure(DEFAULT_HEURE);
        return rendezVous;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RendezVous createUpdatedEntity(EntityManager em) {
        RendezVous rendezVous = new RendezVous()
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .age(UPDATED_AGE)
            .cni(UPDATED_CNI)
            .telephone(UPDATED_TELEPHONE)
            .date(UPDATED_DATE)
            .heure(UPDATED_HEURE);
        return rendezVous;
    }

    @BeforeEach
    public void initTest() {
        rendezVous = createEntity(em);
    }

    @Test
    @Transactional
    public void createRendezVous() throws Exception {
        int databaseSizeBeforeCreate = rendezVousRepository.findAll().size();
        // Create the RendezVous
        restRendezVousMockMvc.perform(post("/api/rendez-vous")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rendezVous)))
            .andExpect(status().isCreated());

        // Validate the RendezVous in the database
        List<RendezVous> rendezVousList = rendezVousRepository.findAll();
        assertThat(rendezVousList).hasSize(databaseSizeBeforeCreate + 1);
        RendezVous testRendezVous = rendezVousList.get(rendezVousList.size() - 1);
        assertThat(testRendezVous.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testRendezVous.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testRendezVous.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testRendezVous.getCni()).isEqualTo(DEFAULT_CNI);
        assertThat(testRendezVous.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testRendezVous.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testRendezVous.getHeure()).isEqualTo(DEFAULT_HEURE);
    }

    @Test
    @Transactional
    public void createRendezVousWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rendezVousRepository.findAll().size();

        // Create the RendezVous with an existing ID
        rendezVous.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRendezVousMockMvc.perform(post("/api/rendez-vous")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rendezVous)))
            .andExpect(status().isBadRequest());

        // Validate the RendezVous in the database
        List<RendezVous> rendezVousList = rendezVousRepository.findAll();
        assertThat(rendezVousList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = rendezVousRepository.findAll().size();
        // set the field null
        rendezVous.setNom(null);

        // Create the RendezVous, which fails.


        restRendezVousMockMvc.perform(post("/api/rendez-vous")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rendezVous)))
            .andExpect(status().isBadRequest());

        List<RendezVous> rendezVousList = rendezVousRepository.findAll();
        assertThat(rendezVousList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = rendezVousRepository.findAll().size();
        // set the field null
        rendezVous.setPrenom(null);

        // Create the RendezVous, which fails.


        restRendezVousMockMvc.perform(post("/api/rendez-vous")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rendezVous)))
            .andExpect(status().isBadRequest());

        List<RendezVous> rendezVousList = rendezVousRepository.findAll();
        assertThat(rendezVousList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAgeIsRequired() throws Exception {
        int databaseSizeBeforeTest = rendezVousRepository.findAll().size();
        // set the field null
        rendezVous.setAge(null);

        // Create the RendezVous, which fails.


        restRendezVousMockMvc.perform(post("/api/rendez-vous")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rendezVous)))
            .andExpect(status().isBadRequest());

        List<RendezVous> rendezVousList = rendezVousRepository.findAll();
        assertThat(rendezVousList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCniIsRequired() throws Exception {
        int databaseSizeBeforeTest = rendezVousRepository.findAll().size();
        // set the field null
        rendezVous.setCni(null);

        // Create the RendezVous, which fails.


        restRendezVousMockMvc.perform(post("/api/rendez-vous")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rendezVous)))
            .andExpect(status().isBadRequest());

        List<RendezVous> rendezVousList = rendezVousRepository.findAll();
        assertThat(rendezVousList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = rendezVousRepository.findAll().size();
        // set the field null
        rendezVous.setDate(null);

        // Create the RendezVous, which fails.


        restRendezVousMockMvc.perform(post("/api/rendez-vous")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rendezVous)))
            .andExpect(status().isBadRequest());

        List<RendezVous> rendezVousList = rendezVousRepository.findAll();
        assertThat(rendezVousList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHeureIsRequired() throws Exception {
        int databaseSizeBeforeTest = rendezVousRepository.findAll().size();
        // set the field null
        rendezVous.setHeure(null);

        // Create the RendezVous, which fails.


        restRendezVousMockMvc.perform(post("/api/rendez-vous")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rendezVous)))
            .andExpect(status().isBadRequest());

        List<RendezVous> rendezVousList = rendezVousRepository.findAll();
        assertThat(rendezVousList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRendezVous() throws Exception {
        // Initialize the database
        rendezVousRepository.saveAndFlush(rendezVous);

        // Get all the rendezVousList
        restRendezVousMockMvc.perform(get("/api/rendez-vous?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rendezVous.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].cni").value(hasItem(DEFAULT_CNI)))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].heure").value(hasItem(DEFAULT_HEURE)));
    }
    
    @Test
    @Transactional
    public void getRendezVous() throws Exception {
        // Initialize the database
        rendezVousRepository.saveAndFlush(rendezVous);

        // Get the rendezVous
        restRendezVousMockMvc.perform(get("/api/rendez-vous/{id}", rendezVous.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(rendezVous.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.cni").value(DEFAULT_CNI))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.heure").value(DEFAULT_HEURE));
    }
    @Test
    @Transactional
    public void getNonExistingRendezVous() throws Exception {
        // Get the rendezVous
        restRendezVousMockMvc.perform(get("/api/rendez-vous/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRendezVous() throws Exception {
        // Initialize the database
        rendezVousRepository.saveAndFlush(rendezVous);

        int databaseSizeBeforeUpdate = rendezVousRepository.findAll().size();

        // Update the rendezVous
        RendezVous updatedRendezVous = rendezVousRepository.findById(rendezVous.getId()).get();
        // Disconnect from session so that the updates on updatedRendezVous are not directly saved in db
        em.detach(updatedRendezVous);
        updatedRendezVous
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .age(UPDATED_AGE)
            .cni(UPDATED_CNI)
            .telephone(UPDATED_TELEPHONE)
            .date(UPDATED_DATE)
            .heure(UPDATED_HEURE);

        restRendezVousMockMvc.perform(put("/api/rendez-vous")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRendezVous)))
            .andExpect(status().isOk());

        // Validate the RendezVous in the database
        List<RendezVous> rendezVousList = rendezVousRepository.findAll();
        assertThat(rendezVousList).hasSize(databaseSizeBeforeUpdate);
        RendezVous testRendezVous = rendezVousList.get(rendezVousList.size() - 1);
        assertThat(testRendezVous.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testRendezVous.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testRendezVous.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testRendezVous.getCni()).isEqualTo(UPDATED_CNI);
        assertThat(testRendezVous.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testRendezVous.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testRendezVous.getHeure()).isEqualTo(UPDATED_HEURE);
    }

    @Test
    @Transactional
    public void updateNonExistingRendezVous() throws Exception {
        int databaseSizeBeforeUpdate = rendezVousRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRendezVousMockMvc.perform(put("/api/rendez-vous")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rendezVous)))
            .andExpect(status().isBadRequest());

        // Validate the RendezVous in the database
        List<RendezVous> rendezVousList = rendezVousRepository.findAll();
        assertThat(rendezVousList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRendezVous() throws Exception {
        // Initialize the database
        rendezVousRepository.saveAndFlush(rendezVous);

        int databaseSizeBeforeDelete = rendezVousRepository.findAll().size();

        // Delete the rendezVous
        restRendezVousMockMvc.perform(delete("/api/rendez-vous/{id}", rendezVous.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RendezVous> rendezVousList = rendezVousRepository.findAll();
        assertThat(rendezVousList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
