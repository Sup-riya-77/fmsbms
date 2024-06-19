package com.project.fmsbms.repositories;

import org.springframework.data.repository.CrudRepository;

import com.project.fmsbms.entities.Payment;

public interface PaymentRepository extends CrudRepository<Payment, Integer> {

}
