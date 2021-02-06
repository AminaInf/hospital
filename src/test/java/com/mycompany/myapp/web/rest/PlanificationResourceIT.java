package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.HospitalApp;
import com.mycompany.myapp.domain.Planification;
import com.mycompany.myapp.repository.PlanificationRepository;

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
 * Integration tests for the {@link PlanificationResource} REST controller.
 */
@SpringBootTest(classes = HospitalApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PlanificationResourceIT {

    private static final Instant DEFAULT_PREVU_LE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PREVU_LE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_OBJET = "AAAAAAAAAA";
    private static final String UPDATED_OBJET = "BBBBBBBBBB";

    private static final Instant DEFAULT_FAIT_LE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FAIT_LE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_PERIODICITE = "AAAAAAAAAA";
    private static final String UPDATED_PERIODICITE = "BBBBBBBBBB";

    private static final String DEFAULT_RESULTAT = "AAAAAAAAAA";
    private static final String UPDATED_RESULTAT = "BBBBBBBBBB";

    @Autowired
    private PlanificationRepository planificationRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPlanificationMockMvc;

    private Planification planification;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Planification createEntity(EntityManager em) {
        Planification planification = new Planification()
            .prevuLe(DEFAULT_PREVU_LE)
            .objet(DEFAULT_OBJET)
            .faitLe(DEFAULT_FAIT_LE)
            .periodicite(DEFAULT_PERIODICITE)
            .resultat(DEFAULT_RESULTAT);
        return planification;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Planification createUpdatedEntity(EntityManager em) {
        Planification planification = new Planification()
            .prevuLe(UPDATED_PREVU_LE)
            .objet(UPDATED_OBJET)
            .faitLe(UPDATED_FAIT_LE)
            .periodicite(UPDATED_PERIODICITE)
            .resultat(UPDATED_RESULTAT);
        return planification;
    }

    @BeforeEach
    public void initTest() {
        planification = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlanification() throws Exception {
        int databaseSizeBeforeCreate = planificationRepository.findAll().size();
        // Create the Planification
        restPlanificationMockMvc.perform(post("/api/planifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(planification)))
            .andExpect(status().isCreated());

        // Validate the Planification in the database
        List<Planification> planificationList = planificationRepository.findAll();
        assertThat(planificationList).hasSize(databaseSizeBeforeCreate + 1);
        Planification testPlanification = planificationList.get(planificationList.size() - 1);
        assertThat(testPlanification.getPrevuLe()).isEqualTo(DEFAULT_PREVU_LE);
        assertThat(testPlanification.getObjet()).isEqualTo(DEFAULT_OBJET);
        assertThat(testPlanification.getFaitLe()).isEqualTo(DEFAULT_FAIT_LE);
        assertThat(testPlanification.getPeriodicite()).isEqualTo(DEFAULT_PERIODICITE);
        assertThat(testPlanification.getResultat()).isEqualTo(DEFAULT_RESULTAT);
    }

    @Test
    @Transactional
    public void createPlanificationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = planificationRepository.findAll().size();

        // Create the Planification with an existing ID
        planification.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlanificationMockMvc.perform(post("/api/planifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(planification)))
            .andExpect(status().isBadRequest());

        // Validate the Planification in the database
        List<Planification> planificationList = planificationRepository.findAll();
        assertThat(planificationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlanifications() throws Exception {
        // Initialize the database
        planificationRepository.saveAndFlush(planification);

        // Get all the planificationList
        restPlanificationMockMvc.perform(get("/api/planifications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(planification.getId().intValue())))
            .andExpect(jsonPath("$.[*].prevuLe").value(hasItem(DEFAULT_PREVU_LE.toString())))
            .andExpect(jsonPath("$.[*].objet").value(hasItem(DEFAULT_OBJET)))
            .andExpect(jsonPath("$.[*].faitLe").value(hasItem(DEFAULT_FAIT_LE.toString())))
            .andExpect(jsonPath("$.[*].periodicite").value(hasItem(DEFAULT_PERIODICITE)))
            .andExpect(jsonPath("$.[*].resultat").value(hasItem(DEFAULT_RESULTAT)));
    }
    
    @Test
    @Transactional
    public void getPlanification() throws Exception {
        // Initialize the database
        planificationRepository.saveAndFlush(planification);

        // Get the planification
        restPlanificationMockMvc.perform(get("/api/planifications/{id}", planification.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(planification.getId().intValue()))
            .andExpect(jsonPath("$.prevuLe").value(DEFAULT_PREVU_LE.toString()))
            .andExpect(jsonPath("$.objet").value(DEFAULT_OBJET))
            .andExpect(jsonPath("$.faitLe").value(DEFAULT_FAIT_LE.toString()))
            .andExpect(jsonPath("$.periodicite").value(DEFAULT_PERIODICITE))
            .andExpect(jsonPath("$.resultat").value(DEFAULT_RESULTAT));
    }
    @Test
    @Transactional
    public void getNonExistingPlanification() throws Exception {
        // Get the planification
        restPlanificationMockMvc.perform(get("/api/planifications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlanification() throws Exception {
        // Initialize the database
        planificationRepository.saveAndFlush(planification);

        int databaseSizeBeforeUpdate = planificationRepository.findAll().size();

        // Update the planification
        Planification updatedPlanification = planificationRepository.findById(planification.getId()).get();
        // Disconnect from session so that the updates on updatedPlanification are not directly saved in db
        em.detach(updatedPlanification);
        updatedPlanification
            .prevuLe(UPDATED_PREVU_LE)
            .objet(UPDATED_OBJET)
            .faitLe(UPDATED_FAIT_LE)
            .periodicite(UPDATED_PERIODICITE)
            .resultat(UPDATED_RESULTAT);

        restPlanificationMockMvc.perform(put("/api/planifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlanification)))
            .andExpect(status().isOk());

        // Validate the Planification in the database
        List<Planification> planificationList = planificationRepository.findAll();
        assertThat(planificationList).hasSize(databaseSizeBeforeUpdate);
        Planification testPlanification = planificationList.get(planificationList.size() - 1);
        assertThat(testPlanification.getPrevuLe()).isEqualTo(UPDATED_PREVU_LE);
        assertThat(testPlanification.getObjet()).isEqualTo(UPDATED_OBJET);
        assertThat(testPlanification.getFaitLe()).isEqualTo(UPDATED_FAIT_LE);
        assertThat(testPlanification.getPeriodicite()).isEqualTo(UPDATED_PERIODICITE);
        assertThat(testPlanification.getResultat()).isEqualTo(UPDATED_RESULTAT);
    }

    @Test
    @Transactional
    public void updateNonExistingPlanification() throws Exception {
        int databaseSizeBeforeUpdate = planificationRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlanificationMockMvc.perform(put("/api/planifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(planification)))
            .andExpect(status().isBadRequest());

        // Validate the Planification in the database
        List<Planification> planificationList = planificationRepository.findAll();
        assertThat(planificationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlanification() throws Exception {
        // Initialize the database
        planificationRepository.saveAndFlush(planification);

        int databaseSizeBeforeDelete = planificationRepository.findAll().size();

        // Delete the planification
        restPlanificationMockMvc.perform(delete("/api/planifications/{id}", planification.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Planification> planificationList = planificationRepository.findAll();
        assertThat(planificationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
