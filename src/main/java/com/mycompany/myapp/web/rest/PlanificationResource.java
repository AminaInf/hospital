package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Planification;
import com.mycompany.myapp.repository.PlanificationRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Planification}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PlanificationResource {

    private final Logger log = LoggerFactory.getLogger(PlanificationResource.class);

    private static final String ENTITY_NAME = "planification";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlanificationRepository planificationRepository;

    public PlanificationResource(PlanificationRepository planificationRepository) {
        this.planificationRepository = planificationRepository;
    }

    /**
     * {@code POST  /planifications} : Create a new planification.
     *
     * @param planification the planification to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new planification, or with status {@code 400 (Bad Request)} if the planification has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/planifications")
    public ResponseEntity<Planification> createPlanification(@RequestBody Planification planification) throws URISyntaxException {
        log.debug("REST request to save Planification : {}", planification);
        if (planification.getId() != null) {
            throw new BadRequestAlertException("A new planification cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Planification result = planificationRepository.save(planification);
        return ResponseEntity.created(new URI("/api/planifications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /planifications} : Updates an existing planification.
     *
     * @param planification the planification to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated planification,
     * or with status {@code 400 (Bad Request)} if the planification is not valid,
     * or with status {@code 500 (Internal Server Error)} if the planification couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/planifications")
    public ResponseEntity<Planification> updatePlanification(@RequestBody Planification planification) throws URISyntaxException {
        log.debug("REST request to update Planification : {}", planification);
        if (planification.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Planification result = planificationRepository.save(planification);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, planification.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /planifications} : get all the planifications.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of planifications in body.
     */
    @GetMapping("/planifications")
    public List<Planification> getAllPlanifications() {
        log.debug("REST request to get all Planifications");
        return planificationRepository.findAll();
    }

    /**
     * {@code GET  /planifications/:id} : get the "id" planification.
     *
     * @param id the id of the planification to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the planification, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/planifications/{id}")
    public ResponseEntity<Planification> getPlanification(@PathVariable Long id) {
        log.debug("REST request to get Planification : {}", id);
        Optional<Planification> planification = planificationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(planification);
    }

    /**
     * {@code DELETE  /planifications/:id} : delete the "id" planification.
     *
     * @param id the id of the planification to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/planifications/{id}")
    public ResponseEntity<Void> deletePlanification(@PathVariable Long id) {
        log.debug("REST request to delete Planification : {}", id);
        planificationRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
