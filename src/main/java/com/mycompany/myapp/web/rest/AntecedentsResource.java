package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Antecedents;
import com.mycompany.myapp.repository.AntecedentsRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Antecedents}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AntecedentsResource {

    private final Logger log = LoggerFactory.getLogger(AntecedentsResource.class);

    private static final String ENTITY_NAME = "antecedents";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AntecedentsRepository antecedentsRepository;

    public AntecedentsResource(AntecedentsRepository antecedentsRepository) {
        this.antecedentsRepository = antecedentsRepository;
    }

    /**
     * {@code POST  /antecedents} : Create a new antecedents.
     *
     * @param antecedents the antecedents to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new antecedents, or with status {@code 400 (Bad Request)} if the antecedents has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/antecedents")
    public ResponseEntity<Antecedents> createAntecedents(@Valid @RequestBody Antecedents antecedents) throws URISyntaxException {
        log.debug("REST request to save Antecedents : {}", antecedents);
        if (antecedents.getId() != null) {
            throw new BadRequestAlertException("A new antecedents cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Antecedents result = antecedentsRepository.save(antecedents);
        return ResponseEntity.created(new URI("/api/antecedents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /antecedents} : Updates an existing antecedents.
     *
     * @param antecedents the antecedents to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated antecedents,
     * or with status {@code 400 (Bad Request)} if the antecedents is not valid,
     * or with status {@code 500 (Internal Server Error)} if the antecedents couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/antecedents")
    public ResponseEntity<Antecedents> updateAntecedents(@Valid @RequestBody Antecedents antecedents) throws URISyntaxException {
        log.debug("REST request to update Antecedents : {}", antecedents);
        if (antecedents.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Antecedents result = antecedentsRepository.save(antecedents);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, antecedents.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /antecedents} : get all the antecedents.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of antecedents in body.
     */
    @GetMapping("/antecedents")
    public ResponseEntity<List<Antecedents>> getAllAntecedents(Pageable pageable) {
        log.debug("REST request to get a page of Antecedents");
        Page<Antecedents> page = antecedentsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /antecedents/:id} : get the "id" antecedents.
     *
     * @param id the id of the antecedents to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the antecedents, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/antecedents/{id}")
    public ResponseEntity<Antecedents> getAntecedents(@PathVariable Long id) {
        log.debug("REST request to get Antecedents : {}", id);
        Optional<Antecedents> antecedents = antecedentsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(antecedents);
    }

    /**
     * {@code DELETE  /antecedents/:id} : delete the "id" antecedents.
     *
     * @param id the id of the antecedents to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/antecedents/{id}")
    public ResponseEntity<Void> deleteAntecedents(@PathVariable Long id) {
        log.debug("REST request to delete Antecedents : {}", id);
        antecedentsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
