package com.project.fmsbms.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.fmsbms.controller.AdminController;
import com.project.fmsbms.entities.CustomerSupport;
import com.project.fmsbms.repositories.CustomerSupportRepository;

@Service
public class CustomerSupportServiceImpl implements CustomerSupportService {
	private static final Logger loggers = LoggerFactory.getLogger(CustomerSupportServiceImpl.class);

	@Autowired
	private CustomerSupportRepository repo;
	
	@Override
	public CustomerSupport addCustomerSupport(CustomerSupport customerSupport) {
		CustomerSupport cs = repo.save(customerSupport);
		loggers.info("addCustomerSupport");
		return cs;
	}

	@Override
	public CustomerSupport updateCustomerSupport(Integer csID) {
		Optional<CustomerSupport> getCS = repo.findById(csID);
		if(getCS.isPresent())
		{
			loggers.info("updateCustomerSupport");
			return getCS.get();
		}
		else
			
			return null;
	}

	@Override
	public CustomerSupport getCustomerSupportById(CustomerSupport customerSupport) {
		Optional<CustomerSupport> updateMember= repo.findById(customerSupport.getId());
		if(updateMember.isPresent())
		{
			loggers.info("getCustomerSupportById");
			return updateMember.get();
		}
		else
		{
			return null;
		}
	}

}
