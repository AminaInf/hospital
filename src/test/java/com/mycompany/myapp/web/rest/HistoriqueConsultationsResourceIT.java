package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.HospitalApp;
import com.mycompany.myapp.domain.HistoriqueConsultations;
import com.mycompany.myapp.repository.HistoriqueConsultationsRepository;

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
 * Integration tests for the {@link HistoriqueConsultationsResource} REST controller.
 */
@SpringBootTest(classes = HospitalApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class HistoriqueConsultationsResourceIT {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_ACTE = "AAAAAAAAAA";
    private static final String UPDATED_ACTE = "BBBBBBBBBB";

    private static final String DEFAULT_MOTIF = "AAAAAAAAAA";
    private static final String UPDATED_MOTIF = "BBBBBBBBBB";

    private static final Double DEFAULT_TAILLE = 1D;
    private static final Double UPDATED_TAILLE = 2D;

    private static final Double DEFAULT_POIDS = 1D;
    private static final Double UPDATED_POIDS = 2D;

    private static final Double DEFAULT_TA = 1D;
    private static final Double UPDATED_TA = 2D;

    private static final Integer DEFAULT_POULS = 1;
    private static final Integer UPDATED_POULS = 2;

    private static final String DEFAULT_OBSERVATION = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVATION = "BBBBBBBBBB";

    private static final String DEFAULT_AT = "AAAAAAAAAA";
    private static final String UPDATED_AT = "BBBBBBBBBB";

    @Autowired
    private HistoriqueConsultationsRepository historiqueConsultationsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restHistoriqueConsultationsMockMvc;

    private HistoriqueConsultations historiqueConsultations;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistoriqueConsultations createEntity(EntityManager em) {
        HistoriqueConsultations historiqueConsultations = new HistoriqueConsultations()
            .date(DEFAULT_DATE)
            .acte(DEFAULT_ACTE)
            .motif(DEFAULT_MOTIF)
            .taille(DEFAULT_TAILLE)
            .poids(DEFAULT_POIDS)
            .ta(DEFAULT_TA)
            .pouls(DEFAULT_POULS)
            .observation(DEFAULT_OBSERVATION)
            .at(DEFAULT_AT);
        return historiqueConsultations;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistoriqueConsultations createUpdatedEntity(EntityManager em) {
        HistoriqueConsultations historiqueConsultations = new HistoriqueConsultations()
            .date(UPDATED_DATE)
            .acte(UPDATED_ACTE)
            .motif(UPDATED_MOTIF)
            .taille(UPDATED_TAILLE)
            .poids(UPDATED_POIDS)
            .ta(UPDATED_TA)
            .pouls(UPDATED_POULS)
            .observation(UPDATED_OBSERVATION)
            .at(UPDATED_AT);
        return historiqueConsultations;
    }

    @BeforeEach
    public void initTest() {
        historiqueConsultations = createEntity(em);
    }

    @Test
    @Transactional
    public void createHistoriqueConsultations() throws Exception {
        int databaseSizeBeforeCreate = historiqueConsultationsRepository.findAll().size();
        // Create the HistoriqueConsultations
        restHistoriqueConsultationsMockMvc.perform(post("/api/historique-consultations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historiqueConsultations)))
            .andExpect(status().isCreated());

        // Validate the HistoriqueConsultations in the database
        List<HistoriqueConsultations> historiqueConsultationsList = historiqueConsultationsRepository.findAll();
        assertThat(historiqueConsultationsList).hasSize(databaseSizeBeforeCreate + 1);
        HistoriqueConsultations testHistoriqueConsultations = historiqueConsultationsList.get(historiqueConsultationsList.size() - 1);
        assertThat(testHistoriqueConsultations.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testHistoriqueConsultations.getActe()).isEqualTo(DEFAULT_ACTE);
        assertThat(testHistoriqueConsultations.getMotif()).isEqualTo(DEFAULT_MOTIF);
        assertThat(testHistoriqueConsultations.getTaille()).isEqualTo(DEFAULT_TAILLE);
        assertThat(testHistoriqueConsultations.getPoids()).isEqualTo(DEFAULT_POIDS);
        assertThat(testHistoriqueConsultations.getTa()).isEqualTo(DEFAULT_TA);
        assertThat(testHistoriqueConsultations.getPouls()).isEqualTo(DEFAULT_POULS);
        assertThat(testHistoriqueConsultations.getObservation()).isEqualTo(DEFAULT_OBSERVATION);
        assertThat(testHistoriqueConsultations.getAt()).isEqualTo(DEFAULT_AT);
    }

    @Test
    @Transactional
    public void createHistoriqueConsultationsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = historiqueConsultationsRepository.findAll().size();

        // Create the HistoriqueConsultations with an existing ID
        historiqueConsultations.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHistoriqueConsultationsMockMvc.perform(post("/api/historique-consultations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historiqueConsultations)))
            .andExpect(status().isBadRequest());

        // Validate the HistoriqueConsultations in the database
        List<HistoriqueConsultations> historiqueConsultationsList = historiqueConsultationsRepository.findAll();
        assertThat(historiqueConsultationsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllHistoriqueConsultations() throws Exception {
        // Initialize the database
        historiqueConsultationsRepository.saveAndFlush(historiqueConsultations);

        // Get all the historiqueConsultationsList
        restHistoriqueConsultationsMockMvc.perform(get("/api/historique-consultations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(historiqueConsultations.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].acte").value(hasItem(DEFAULT_ACTE)))
            .andExpect(jsonPath("$.[*].motif").value(hasItem(DEFAULT_MOTIF)))
            .andExpect(jsonPath("$.[*].taille").value(hasItem(DEFAULT_TAILLE.doubleValue())))
            .andExpect(jsonPath("$.[*].poids").value(hasItem(DEFAULT_POIDS.doubleValue())))
            .andExpect(jsonPath("$.[*].ta").value(hasItem(DEFAULT_TA.doubleValue())))
            .andExpect(jsonPath("$.[*].pouls").value(hasItem(DEFAULT_POULS)))
            .andExpect(jsonPath("$.[*].observation").value(hasItem(DEFAULT_OBSERVATION)))
            .andExpect(jsonPath("$.[*].at").value(hasItem(DEFAULT_AT)));
    }
    
    @Test
    @Transactional
    public void getHistoriqueConsultations() throws Exception {
        // Initialize the database
        historiqueConsultationsRepository.saveAndFlush(historiqueConsultations);

        // Get the historiqueConsultations
        restHistoriqueConsultationsMockMvc.perform(get("/api/historique-consultations/{id}", historiqueConsultations.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(historiqueConsultations.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.acte").value(DEFAULT_ACTE))
            .andExpect(jsonPath("$.motif").value(DEFAULT_MOTIF))
            .andExpect(jsonPath("$.taille").value(DEFAULT_TAILLE.doubleValue()))
            .andExpect(jsonPath("$.poids").value(DEFAULT_POIDS.doubleValue()))
            .andExpect(jsonPath("$.ta").value(DEFAULT_TA.doubleValue()))
            .andExpect(jsonPath("$.pouls").value(DEFAULT_POULS))
            .andExpect(jsonPath("$.observation").value(DEFAULT_OBSERVATION))
            .andExpect(jsonPath("$.at").value(DEFAULT_AT));
    }
    @Test
    @Transactional
    public void getNonExistingHistoriqueConsultations() throws Exception {
        // Get the historiqueConsultations
        restHistoriqueConsultationsMockMvc.perform(get("/api/historique-consultations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHistoriqueConsultations() throws Exception {
        // Initialize the database
        historiqueConsultationsRepository.saveAndFlush(historiqueConsultations);

        int databaseSizeBeforeUpdate = historiqueConsultationsRepository.findAll().size();

        // Update the historiqueConsultations
        HistoriqueConsultations updatedHistoriqueConsultations = historiqueConsultationsRepository.findById(historiqueConsultations.getId()).get();
        // Disconnect from session so that the updates on updatedHistoriqueConsultations are not directly saved in db
        em.detach(updatedHistoriqueConsultations);
        updatedHistoriqueConsultations
            .date(UPDATED_DATE)
            .acte(UPDATED_ACTE)
            .motif(UPDATED_MOTIF)
            .taille(UPDATED_TAILLE)
            .poids(UPDATED_POIDS)
            .ta(UPDATED_TA)
            .pouls(UPDATED_POULS)
            .observation(UPDATED_OBSERVATION)
            .at(UPDATED_AT);

        restHistoriqueConsultationsMockMvc.perform(put("/api/historique-consultations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedHistoriqueConsultations)))
            .andExpect(status().isOk());

        // Validate the HistoriqueConsultations in the database
        List<HistoriqueConsultations> historiqueConsultationsList = historiqueConsultationsRepository.findAll();
        assertThat(historiqueConsultationsList).hasSize(databaseSizeBeforeUpdate);
        HistoriqueConsultations testHistoriqueConsultations = historiqueConsultationsList.get(historiqueConsultationsList.size() - 1);
        assertThat(testHistoriqueConsultations.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testHistoriqueConsultations.getActe()).isEqualTo(UPDATED_ACTE);
        assertThat(testHistoriqueConsultations.getMotif()).isEqualTo(UPDATED_MOTIF);
        assertThat(testHistoriqueConsultations.getTaille()).isEqualTo(UPDATED_TAILLE);
        assertThat(testHistoriqueConsultations.getPoids()).isEqualTo(UPDATED_POIDS);
        assertThat(testHistoriqueConsultations.getTa()).isEqualTo(UPDATED_TA);
        assertThat(testHistoriqueConsultations.getPouls()).isEqualTo(UPDATED_POULS);
        assertThat(testHistoriqueConsultations.getObservation()).isEqualTo(UPDATED_OBSERVATION);
        assertThat(testHistoriqueConsultations.getAt()).isEqualTo(UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingHistoriqueConsultations() throws Exception {
        int databaseSizeBeforeUpdate = historiqueConsultationsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHistoriqueConsultationsMockMvc.perform(put("/api/historique-consultations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historiqueConsultations)))
            .andExpect(status().isBadRequest());

        // Validate the HistoriqueConsultations in the database
        List<HistoriqueConsultations> historiqueConsultationsList = historiqueConsultationsRepository.findAll();
        assertThat(historiqueConsultationsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHistoriqueConsultations() throws Exception {
        // Initialize the database
        historiqueConsultationsRepository.saveAndFlush(historiqueConsultations);

        int databaseSizeBeforeDelete = historiqueConsultationsRepository.findAll().size();

        // Delete the historiqueConsultations
        restHistoriqueConsultationsMockMvc.perform(delete("/api/historique-consultations/{id}", historiqueConsultations.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<HistoriqueConsultations> historiqueConsultationsList = historiqueConsultationsRepository.findAll();
        assertThat(historiqueConsultationsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
