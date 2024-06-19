package com.project.fmsbms.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
 
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
	private static final Logger loggers = LoggerFactory.getLogger(AdminController.class);
 
	@GetMapping("/systemadmin")
	public String userAccess() {
		loggers.info("systemadmin");
		return "System Admin.";
	}
 
	@GetMapping("/familyhead")
	public String parentAccess() {
		loggers.info("familyhead");
		return "Account Holder";
	}
 
	@GetMapping("/customersupport")
	public String childAccess() {
		loggers.info("customersupport");
		return "Customer Support.";
	}
	@GetMapping("/all")
	public String chhildAccess() {
		loggers.info("all");
		return "All.";
	}
 
}