package com.project.fmsbms.repositories;


import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.fmsbms.entities.Billing;
import com.project.fmsbms.entities.Family;

@Repository
public interface BillingRepositoty extends CrudRepository<Billing, Integer>{
	public List<Billing> findAllByFamily(Family family);
}
