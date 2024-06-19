package com.project.fmsbms.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.fmsbms.entities.CustomerSupport;

@Repository
public interface CustomerSupportRepository extends CrudRepository<CustomerSupport, Integer> {

}
