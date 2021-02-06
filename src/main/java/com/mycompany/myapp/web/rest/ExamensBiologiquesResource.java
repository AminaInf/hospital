package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ExamensBiologiques;
import com.mycompany.myapp.repository.ExamensBiologiquesRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.ExamensBiologiques}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ExamensBiologiquesResource {

    private final Logger log = LoggerFactory.getLogger(ExamensBiologiquesResource.class);

    private static final String ENTITY_NAME = "examensBiologiques";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExamensBiologiquesRepository examensBiologiquesRepository;

    public ExamensBiologiquesResource(ExamensBiologiquesRepository examensBiologiquesRepository) {
        this.examensBiologiquesRepository = examensBiologiquesRepository;
    }

    /**
     * {@code POST  /examens-biologiques} : Create a new examensBiologiques.
     *
     * @param examensBiologiques the examensBiologiques to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new examensBiologiques, or with status {@code 400 (Bad Request)} if the examensBiologiques has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/examens-biologiques")
    public ResponseEntity<ExamensBiologiques> createExamensBiologiques(@RequestBody ExamensBiologiques examensBiologiques) throws URISyntaxException {
        log.debug("REST request to save ExamensBiologiques : {}", examensBiologiques);
        if (examensBiologiques.getId() != null) {
            throw new BadRequestAlertException("A new examensBiologiques cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExamensBiologiques result = examensBiologiquesRepository.save(examensBiologiques);
        return ResponseEntity.created(new URI("/api/examens-biologiques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /examens-biologiques} : Updates an existing examensBiologiques.
     *
     * @param examensBiologiques the examensBiologiques to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated examensBiologiques,
     * or with status {@code 400 (Bad Request)} if the examensBiologiques is not valid,
     * or with status {@code 500 (Internal Server Error)} if the examensBiologiques couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/examens-biologiques")
    public ResponseEntity<ExamensBiologiques> updateExamensBiologiques(@RequestBody ExamensBiologiques examensBiologiques) throws URISyntaxException {
        log.debug("REST request to update ExamensBiologiques : {}", examensBiologiques);
        if (examensBiologiques.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ExamensBiologiques result = examensBiologiquesRepository.save(examensBiologiques);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, examensBiologiques.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /examens-biologiques} : get all the examensBiologiques.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of examensBiologiques in body.
     */
    @GetMapping("/examens-biologiques")
    public List<ExamensBiologiques> getAllExamensBiologiques() {
        log.debug("REST request to get all ExamensBiologiques");
        return examensBiologiquesRepository.findAll();
    }

    /**
     * {@code GET  /examens-biologiques/:id} : get the "id" examensBiologiques.
     *
     * @param id the id of the examensBiologiques to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the examensBiologiques, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/examens-biologiques/{id}")
    public ResponseEntity<ExamensBiologiques> getExamensBiologiques(@PathVariable Long id) {
        log.debug("REST request to get ExamensBiologiques : {}", id);
        Optional<ExamensBiologiques> examensBiologiques = examensBiologiquesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(examensBiologiques);
    }

    /**
     * {@code DELETE  /examens-biologiques/:id} : delete the "id" examensBiologiques.
     *
     * @param id the id of the examensBiologiques to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/examens-biologiques/{id}")
    public ResponseEntity<Void> deleteExamensBiologiques(@PathVariable Long id) {
        log.debug("REST request to delete ExamensBiologiques : {}", id);
        examensBiologiquesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
