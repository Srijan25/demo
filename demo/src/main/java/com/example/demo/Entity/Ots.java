package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "ots")
@Getter
@Setter
public class Ots {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int otsId;

    @Column(name = "Accounts", nullable = false, length = 50)
    private String accounts;

    @Column(name = "CustomerName", nullable = false, length = 50)
    private String customerName;

    @Column(name = "Amount", nullable = false, length = 50)
    private double amount;

    @Column(name = "SanctionDate",  length = 50)
    private Date sanctionDate;

    @Column(name = "ExpiryDate", length = 50)
    private Date expiryDate;

    @Column(name = "UpdatedBy",  length = 50)
    private Date updatedBy;

    @Column(name = "CreationDate", length = 50)
    private Date creationDate;

    @PrePersist
    protected void prePersist() {
        if (this.creationDate == null) creationDate = new Date();
        if (this.updatedBy == null) updatedBy = new Date();
    }

    @PreUpdate
    protected void preUpdate() {
        this.updatedBy = new Date();
    }

    @PreRemove
    protected void preRemove() {
        this.updatedBy = new Date();
    }
}
