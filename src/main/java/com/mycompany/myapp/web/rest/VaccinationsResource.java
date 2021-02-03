package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Vaccinations;
import com.mycompany.myapp.repository.VaccinationsRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Vaccinations}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VaccinationsResource {

    private final Logger log = LoggerFactory.getLogger(VaccinationsResource.class);

    private static final String ENTITY_NAME = "vaccinations";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VaccinationsRepository vaccinationsRepository;

    public VaccinationsResource(VaccinationsRepository vaccinationsRepository) {
        this.vaccinationsRepository = vaccinationsRepository;
    }

    /**
     * {@code POST  /vaccinations} : Create a new vaccinations.
     *
     * @param vaccinations the vaccinations to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vaccinations, or with status {@code 400 (Bad Request)} if the vaccinations has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/vaccinations")
    public ResponseEntity<Vaccinations> createVaccinations(@RequestBody Vaccinations vaccinations) throws URISyntaxException {
        log.debug("REST request to save Vaccinations : {}", vaccinations);
        if (vaccinations.getId() != null) {
            throw new BadRequestAlertException("A new vaccinations cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Vaccinations result = vaccinationsRepository.save(vaccinations);
        return ResponseEntity.created(new URI("/api/vaccinations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vaccinations} : Updates an existing vaccinations.
     *
     * @param vaccinations the vaccinations to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vaccinations,
     * or with status {@code 400 (Bad Request)} if the vaccinations is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vaccinations couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/vaccinations")
    public ResponseEntity<Vaccinations> updateVaccinations(@RequestBody Vaccinations vaccinations) throws URISyntaxException {
        log.debug("REST request to update Vaccinations : {}", vaccinations);
        if (vaccinations.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Vaccinations result = vaccinationsRepository.save(vaccinations);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, vaccinations.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /vaccinations} : get all the vaccinations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vaccinations in body.
     */
    @GetMapping("/vaccinations")
    public List<Vaccinations> getAllVaccinations() {
        log.debug("REST request to get all Vaccinations");
        return vaccinationsRepository.findAll();
    }

    /**
     * {@code GET  /vaccinations/:id} : get the "id" vaccinations.
     *
     * @param id the id of the vaccinations to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vaccinations, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vaccinations/{id}")
    public ResponseEntity<Vaccinations> getVaccinations(@PathVariable Long id) {
        log.debug("REST request to get Vaccinations : {}", id);
        Optional<Vaccinations> vaccinations = vaccinationsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vaccinations);
    }

    /**
     * {@code DELETE  /vaccinations/:id} : delete the "id" vaccinations.
     *
     * @param id the id of the vaccinations to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/vaccinations/{id}")
    public ResponseEntity<Void> deleteVaccinations(@PathVariable Long id) {
        log.debug("REST request to delete Vaccinations : {}", id);
        vaccinationsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
