package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.HospitalApp;
import com.mycompany.myapp.domain.Vaccinations;
import com.mycompany.myapp.repository.VaccinationsRepository;

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
 * Integration tests for the {@link VaccinationsResource} REST controller.
 */
@SpringBootTest(classes = HospitalApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class VaccinationsResourceIT {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_VACCIN = "AAAAAAAAAA";
    private static final String UPDATED_VACCIN = "BBBBBBBBBB";

    private static final String DEFAULT_INJECTION = "AAAAAAAAAA";
    private static final String UPDATED_INJECTION = "BBBBBBBBBB";

    private static final String DEFAULT_METHODE = "AAAAAAAAAA";
    private static final String UPDATED_METHODE = "BBBBBBBBBB";

    private static final String DEFAULT_LOT = "AAAAAAAAAA";
    private static final String UPDATED_LOT = "BBBBBBBBBB";

    private static final String DEFAULT_RESULTAT = "AAAAAAAAAA";
    private static final String UPDATED_RESULTAT = "BBBBBBBBBB";

    private static final Instant DEFAULT_RAPPEL = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_RAPPEL = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private VaccinationsRepository vaccinationsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVaccinationsMockMvc;

    private Vaccinations vaccinations;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Vaccinations createEntity(EntityManager em) {
        Vaccinations vaccinations = new Vaccinations()
            .date(DEFAULT_DATE)
            .vaccin(DEFAULT_VACCIN)
            .injection(DEFAULT_INJECTION)
            .methode(DEFAULT_METHODE)
            .lot(DEFAULT_LOT)
            .resultat(DEFAULT_RESULTAT)
            .rappel(DEFAULT_RAPPEL);
        return vaccinations;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Vaccinations createUpdatedEntity(EntityManager em) {
        Vaccinations vaccinations = new Vaccinations()
            .date(UPDATED_DATE)
            .vaccin(UPDATED_VACCIN)
            .injection(UPDATED_INJECTION)
            .methode(UPDATED_METHODE)
            .lot(UPDATED_LOT)
            .resultat(UPDATED_RESULTAT)
            .rappel(UPDATED_RAPPEL);
        return vaccinations;
    }

    @BeforeEach
    public void initTest() {
        vaccinations = createEntity(em);
    }

    @Test
    @Transactional
    public void createVaccinations() throws Exception {
        int databaseSizeBeforeCreate = vaccinationsRepository.findAll().size();
        // Create the Vaccinations
        restVaccinationsMockMvc.perform(post("/api/vaccinations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vaccinations)))
            .andExpect(status().isCreated());

        // Validate the Vaccinations in the database
        List<Vaccinations> vaccinationsList = vaccinationsRepository.findAll();
        assertThat(vaccinationsList).hasSize(databaseSizeBeforeCreate + 1);
        Vaccinations testVaccinations = vaccinationsList.get(vaccinationsList.size() - 1);
        assertThat(testVaccinations.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testVaccinations.getVaccin()).isEqualTo(DEFAULT_VACCIN);
        assertThat(testVaccinations.getInjection()).isEqualTo(DEFAULT_INJECTION);
        assertThat(testVaccinations.getMethode()).isEqualTo(DEFAULT_METHODE);
        assertThat(testVaccinations.getLot()).isEqualTo(DEFAULT_LOT);
        assertThat(testVaccinations.getResultat()).isEqualTo(DEFAULT_RESULTAT);
        assertThat(testVaccinations.getRappel()).isEqualTo(DEFAULT_RAPPEL);
    }

    @Test
    @Transactional
    public void createVaccinationsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vaccinationsRepository.findAll().size();

        // Create the Vaccinations with an existing ID
        vaccinations.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVaccinationsMockMvc.perform(post("/api/vaccinations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vaccinations)))
            .andExpect(status().isBadRequest());

        // Validate the Vaccinations in the database
        List<Vaccinations> vaccinationsList = vaccinationsRepository.findAll();
        assertThat(vaccinationsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllVaccinations() throws Exception {
        // Initialize the database
        vaccinationsRepository.saveAndFlush(vaccinations);

        // Get all the vaccinationsList
        restVaccinationsMockMvc.perform(get("/api/vaccinations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vaccinations.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].vaccin").value(hasItem(DEFAULT_VACCIN)))
            .andExpect(jsonPath("$.[*].injection").value(hasItem(DEFAULT_INJECTION)))
            .andExpect(jsonPath("$.[*].methode").value(hasItem(DEFAULT_METHODE)))
            .andExpect(jsonPath("$.[*].lot").value(hasItem(DEFAULT_LOT)))
            .andExpect(jsonPath("$.[*].resultat").value(hasItem(DEFAULT_RESULTAT)))
            .andExpect(jsonPath("$.[*].rappel").value(hasItem(DEFAULT_RAPPEL.toString())));
    }
    
    @Test
    @Transactional
    public void getVaccinations() throws Exception {
        // Initialize the database
        vaccinationsRepository.saveAndFlush(vaccinations);

        // Get the vaccinations
        restVaccinationsMockMvc.perform(get("/api/vaccinations/{id}", vaccinations.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(vaccinations.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.vaccin").value(DEFAULT_VACCIN))
            .andExpect(jsonPath("$.injection").value(DEFAULT_INJECTION))
            .andExpect(jsonPath("$.methode").value(DEFAULT_METHODE))
            .andExpect(jsonPath("$.lot").value(DEFAULT_LOT))
            .andExpect(jsonPath("$.resultat").value(DEFAULT_RESULTAT))
            .andExpect(jsonPath("$.rappel").value(DEFAULT_RAPPEL.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingVaccinations() throws Exception {
        // Get the vaccinations
        restVaccinationsMockMvc.perform(get("/api/vaccinations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVaccinations() throws Exception {
        // Initialize the database
        vaccinationsRepository.saveAndFlush(vaccinations);

        int databaseSizeBeforeUpdate = vaccinationsRepository.findAll().size();

        // Update the vaccinations
        Vaccinations updatedVaccinations = vaccinationsRepository.findById(vaccinations.getId()).get();
        // Disconnect from session so that the updates on updatedVaccinations are not directly saved in db
        em.detach(updatedVaccinations);
        updatedVaccinations
            .date(UPDATED_DATE)
            .vaccin(UPDATED_VACCIN)
            .injection(UPDATED_INJECTION)
            .methode(UPDATED_METHODE)
            .lot(UPDATED_LOT)
            .resultat(UPDATED_RESULTAT)
            .rappel(UPDATED_RAPPEL);

        restVaccinationsMockMvc.perform(put("/api/vaccinations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedVaccinations)))
            .andExpect(status().isOk());

        // Validate the Vaccinations in the database
        List<Vaccinations> vaccinationsList = vaccinationsRepository.findAll();
        assertThat(vaccinationsList).hasSize(databaseSizeBeforeUpdate);
        Vaccinations testVaccinations = vaccinationsList.get(vaccinationsList.size() - 1);
        assertThat(testVaccinations.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testVaccinations.getVaccin()).isEqualTo(UPDATED_VACCIN);
        assertThat(testVaccinations.getInjection()).isEqualTo(UPDATED_INJECTION);
        assertThat(testVaccinations.getMethode()).isEqualTo(UPDATED_METHODE);
        assertThat(testVaccinations.getLot()).isEqualTo(UPDATED_LOT);
        assertThat(testVaccinations.getResultat()).isEqualTo(UPDATED_RESULTAT);
        assertThat(testVaccinations.getRappel()).isEqualTo(UPDATED_RAPPEL);
    }

    @Test
    @Transactional
    public void updateNonExistingVaccinations() throws Exception {
        int databaseSizeBeforeUpdate = vaccinationsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVaccinationsMockMvc.perform(put("/api/vaccinations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vaccinations)))
            .andExpect(status().isBadRequest());

        // Validate the Vaccinations in the database
        List<Vaccinations> vaccinationsList = vaccinationsRepository.findAll();
        assertThat(vaccinationsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVaccinations() throws Exception {
        // Initialize the database
        vaccinationsRepository.saveAndFlush(vaccinations);

        int databaseSizeBeforeDelete = vaccinationsRepository.findAll().size();

        // Delete the vaccinations
        restVaccinationsMockMvc.perform(delete("/api/vaccinations/{id}", vaccinations.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Vaccinations> vaccinationsList = vaccinationsRepository.findAll();
        assertThat(vaccinationsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
