package com.project.fmsbms.service;

import com.project.fmsbms.entities.CustomerSupport;

public interface CustomerSupportService {
	
	public CustomerSupport addCustomerSupport(CustomerSupport customerSupport);
	
	public CustomerSupport updateCustomerSupport(Integer csID);
	
	public CustomerSupport getCustomerSupportById(CustomerSupport customerSupport);
}
