package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Antecedents.
 */
@Entity
@Table(name = "antecedents")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Antecedents implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 2)
    @Column(name = "medicaux")
    private String medicaux;

    @Size(min = 2)
    @Column(name = "chirurgicaux")
    private String chirurgicaux;

    @Size(min = 2)
    @Column(name = "familiaux")
    private String familiaux;

    @Size(min = 2)
    @Column(name = "alergie_intolerance")
    private String alergieIntolerance;

    @ManyToOne
    @JsonIgnoreProperties(value = "antecedents", allowSetters = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMedicaux() {
        return medicaux;
    }

    public Antecedents medicaux(String medicaux) {
        this.medicaux = medicaux;
        return this;
    }

    public void setMedicaux(String medicaux) {
        this.medicaux = medicaux;
    }

    public String getChirurgicaux() {
        return chirurgicaux;
    }

    public Antecedents chirurgicaux(String chirurgicaux) {
        this.chirurgicaux = chirurgicaux;
        return this;
    }

    public void setChirurgicaux(String chirurgicaux) {
        this.chirurgicaux = chirurgicaux;
    }

    public String getFamiliaux() {
        return familiaux;
    }

    public Antecedents familiaux(String familiaux) {
        this.familiaux = familiaux;
        return this;
    }

    public void setFamiliaux(String familiaux) {
        this.familiaux = familiaux;
    }

    public String getAlergieIntolerance() {
        return alergieIntolerance;
    }

    public Antecedents alergieIntolerance(String alergieIntolerance) {
        this.alergieIntolerance = alergieIntolerance;
        return this;
    }

    public void setAlergieIntolerance(String alergieIntolerance) {
        this.alergieIntolerance = alergieIntolerance;
    }

    public User getUser() {
        return user;
    }

    public Antecedents user(User user) {
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
        if (!(o instanceof Antecedents)) {
            return false;
        }
        return id != null && id.equals(((Antecedents) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Antecedents{" +
            "id=" + getId() +
            ", medicaux='" + getMedicaux() + "'" +
            ", chirurgicaux='" + getChirurgicaux() + "'" +
            ", familiaux='" + getFamiliaux() + "'" +
            ", alergieIntolerance='" + getAlergieIntolerance() + "'" +
            "}";
    }
}
