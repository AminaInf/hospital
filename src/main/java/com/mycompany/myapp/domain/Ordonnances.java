package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Ordonnances.
 */
@Entity
@Table(name = "ordonnances")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Ordonnances implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private Instant date;

    @Column(name = "categorie")
    private String categorie;

    @Column(name = "prescription")
    private String prescription;

    @ManyToOne
    @JsonIgnoreProperties(value = "ordonnances", allowSetters = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public Ordonnances date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getCategorie() {
        return categorie;
    }

    public Ordonnances categorie(String categorie) {
        this.categorie = categorie;
        return this;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public String getPrescription() {
        return prescription;
    }

    public Ordonnances prescription(String prescription) {
        this.prescription = prescription;
        return this;
    }

    public void setPrescription(String prescription) {
        this.prescription = prescription;
    }

    public User getUser() {
        return user;
    }

    public Ordonnances user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ordonnances)) {
            return false;
        }
        return id != null && id.equals(((Ordonnances) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ordonnances{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", categorie='" + getCategorie() + "'" +
            ", prescription='" + getPrescription() + "'" +
            "}";
    }
}
