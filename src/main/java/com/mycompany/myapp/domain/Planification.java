package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Planification.
 */
@Entity
@Table(name = "planification")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Planification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "prevu_le")
    private Instant prevuLe;

    @Column(name = "objet")
    private String objet;

    @Column(name = "fait_le")
    private Instant faitLe;

    @Column(name = "periodicite")
    private String periodicite;

    @Column(name = "resultat")
    private String resultat;

    @ManyToOne
    @JsonIgnoreProperties(value = "planifications", allowSetters = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getPrevuLe() {
        return prevuLe;
    }

    public Planification prevuLe(Instant prevuLe) {
        this.prevuLe = prevuLe;
        return this;
    }

    public void setPrevuLe(Instant prevuLe) {
        this.prevuLe = prevuLe;
    }

    public String getObjet() {
        return objet;
    }

    public Planification objet(String objet) {
        this.objet = objet;
        return this;
    }

    public void setObjet(String objet) {
        this.objet = objet;
    }

    public Instant getFaitLe() {
        return faitLe;
    }

    public Planification faitLe(Instant faitLe) {
        this.faitLe = faitLe;
        return this;
    }

    public void setFaitLe(Instant faitLe) {
        this.faitLe = faitLe;
    }

    public String getPeriodicite() {
        return periodicite;
    }

    public Planification periodicite(String periodicite) {
        this.periodicite = periodicite;
        return this;
    }

    public void setPeriodicite(String periodicite) {
        this.periodicite = periodicite;
    }

    public String getResultat() {
        return resultat;
    }

    public Planification resultat(String resultat) {
        this.resultat = resultat;
        return this;
    }

    public void setResultat(String resultat) {
        this.resultat = resultat;
    }

    public User getUser() {
        return user;
    }

    public Planification user(User user) {
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
        if (!(o instanceof Planification)) {
            return false;
        }
        return id != null && id.equals(((Planification) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Planification{" +
            "id=" + getId() +
            ", prevuLe='" + getPrevuLe() + "'" +
            ", objet='" + getObjet() + "'" +
            ", faitLe='" + getFaitLe() + "'" +
            ", periodicite='" + getPeriodicite() + "'" +
            ", resultat='" + getResultat() + "'" +
            "}";
    }
}
