package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.HospitalApp;
import com.mycompany.myapp.domain.Ordonnances;
import com.mycompany.myapp.repository.OrdonnancesRepository;

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
 * Integration tests for the {@link OrdonnancesResource} REST controller.
 */
@SpringBootTest(classes = HospitalApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class OrdonnancesResourceIT {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CATEGORIE = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORIE = "BBBBBBBBBB";

    private static final String DEFAULT_PRESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_PRESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private OrdonnancesRepository ordonnancesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOrdonnancesMockMvc;

    private Ordonnances ordonnances;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ordonnances createEntity(EntityManager em) {
        Ordonnances ordonnances = new Ordonnances()
            .date(DEFAULT_DATE)
            .categorie(DEFAULT_CATEGORIE)
            .prescription(DEFAULT_PRESCRIPTION);
        return ordonnances;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ordonnances createUpdatedEntity(EntityManager em) {
        Ordonnances ordonnances = new Ordonnances()
            .date(UPDATED_DATE)
            .categorie(UPDATED_CATEGORIE)
            .prescription(UPDATED_PRESCRIPTION);
        return ordonnances;
    }

    @BeforeEach
    public void initTest() {
        ordonnances = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrdonnances() throws Exception {
        int databaseSizeBeforeCreate = ordonnancesRepository.findAll().size();
        // Create the Ordonnances
        restOrdonnancesMockMvc.perform(post("/api/ordonnances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ordonnances)))
            .andExpect(status().isCreated());

        // Validate the Ordonnances in the database
        List<Ordonnances> ordonnancesList = ordonnancesRepository.findAll();
        assertThat(ordonnancesList).hasSize(databaseSizeBeforeCreate + 1);
        Ordonnances testOrdonnances = ordonnancesList.get(ordonnancesList.size() - 1);
        assertThat(testOrdonnances.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testOrdonnances.getCategorie()).isEqualTo(DEFAULT_CATEGORIE);
        assertThat(testOrdonnances.getPrescription()).isEqualTo(DEFAULT_PRESCRIPTION);
    }

    @Test
    @Transactional
    public void createOrdonnancesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ordonnancesRepository.findAll().size();

        // Create the Ordonnances with an existing ID
        ordonnances.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrdonnancesMockMvc.perform(post("/api/ordonnances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ordonnances)))
            .andExpect(status().isBadRequest());

        // Validate the Ordonnances in the database
        List<Ordonnances> ordonnancesList = ordonnancesRepository.findAll();
        assertThat(ordonnancesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllOrdonnances() throws Exception {
        // Initialize the database
        ordonnancesRepository.saveAndFlush(ordonnances);

        // Get all the ordonnancesList
        restOrdonnancesMockMvc.perform(get("/api/ordonnances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ordonnances.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].categorie").value(hasItem(DEFAULT_CATEGORIE)))
            .andExpect(jsonPath("$.[*].prescription").value(hasItem(DEFAULT_PRESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getOrdonnances() throws Exception {
        // Initialize the database
        ordonnancesRepository.saveAndFlush(ordonnances);

        // Get the ordonnances
        restOrdonnancesMockMvc.perform(get("/api/ordonnances/{id}", ordonnances.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ordonnances.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.categorie").value(DEFAULT_CATEGORIE))
            .andExpect(jsonPath("$.prescription").value(DEFAULT_PRESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingOrdonnances() throws Exception {
        // Get the ordonnances
        restOrdonnancesMockMvc.perform(get("/api/ordonnances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrdonnances() throws Exception {
        // Initialize the database
        ordonnancesRepository.saveAndFlush(ordonnances);

        int databaseSizeBeforeUpdate = ordonnancesRepository.findAll().size();

        // Update the ordonnances
        Ordonnances updatedOrdonnances = ordonnancesRepository.findById(ordonnances.getId()).get();
        // Disconnect from session so that the updates on updatedOrdonnances are not directly saved in db
        em.detach(updatedOrdonnances);
        updatedOrdonnances
            .date(UPDATED_DATE)
            .categorie(UPDATED_CATEGORIE)
            .prescription(UPDATED_PRESCRIPTION);

        restOrdonnancesMockMvc.perform(put("/api/ordonnances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrdonnances)))
            .andExpect(status().isOk());

        // Validate the Ordonnances in the database
        List<Ordonnances> ordonnancesList = ordonnancesRepository.findAll();
        assertThat(ordonnancesList).hasSize(databaseSizeBeforeUpdate);
        Ordonnances testOrdonnances = ordonnancesList.get(ordonnancesList.size() - 1);
        assertThat(testOrdonnances.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testOrdonnances.getCategorie()).isEqualTo(UPDATED_CATEGORIE);
        assertThat(testOrdonnances.getPrescription()).isEqualTo(UPDATED_PRESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingOrdonnances() throws Exception {
        int databaseSizeBeforeUpdate = ordonnancesRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrdonnancesMockMvc.perform(put("/api/ordonnances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ordonnances)))
            .andExpect(status().isBadRequest());

        // Validate the Ordonnances in the database
        List<Ordonnances> ordonnancesList = ordonnancesRepository.findAll();
        assertThat(ordonnancesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrdonnances() throws Exception {
        // Initialize the database
        ordonnancesRepository.saveAndFlush(ordonnances);

        int databaseSizeBeforeDelete = ordonnancesRepository.findAll().size();

        // Delete the ordonnances
        restOrdonnancesMockMvc.perform(delete("/api/ordonnances/{id}", ordonnances.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ordonnances> ordonnancesList = ordonnancesRepository.findAll();
        assertThat(ordonnancesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
