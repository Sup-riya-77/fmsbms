
package com.project.fmsbms.controller;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.fmsbms.entities.Billing;
import com.project.fmsbms.entities.Family;
import com.project.fmsbms.entities.FamilyMember;
import com.project.fmsbms.entities.MobileService;
import com.project.fmsbms.entities.Plans;
import com.project.fmsbms.entities.request.FamilyId;
import com.project.fmsbms.entities.request.FamilyMemberRequest;
import com.project.fmsbms.entities.request.GetBillingRequest;
import com.project.fmsbms.entities.request.GetFamilyMemberRequest;
import com.project.fmsbms.entities.request.GetId;
import com.project.fmsbms.entities.request.MobileServiceById;
import com.project.fmsbms.entities.request.MobileServiceRequest;
import com.project.fmsbms.entities.request.UpdateMobileService;
import com.project.fmsbms.exceptions.BillingServiceNotFoundException;
import com.project.fmsbms.exceptions.FamilyMemberNotFoundException;
import com.project.fmsbms.exceptions.FamilyNotFoundException;
import com.project.fmsbms.exceptions.MobileServiceNotFoundException;
import com.project.fmsbms.service.BillingService;
import com.project.fmsbms.service.FamilyMemberService;
import com.project.fmsbms.service.FamilyService;
import com.project.fmsbms.service.MobileServiceService;


@RestController
@RequestMapping("/api/familycontroller")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FamilyController {
	private static final Logger loggers = LoggerFactory.getLogger(FamilyController.class);

	@Autowired
	BillingService billingService;
	
	@Autowired
	FamilyService familyService;
	
	@Autowired
	FamilyMemberService familyMemeberService;
	
	@Autowired
	MobileServiceService mobileService;
	
	@PostMapping("/addmember") 
	public ResponseEntity<FamilyMember> addFamilyMember(@RequestBody FamilyMemberRequest familyMemberRequest) throws FamilyNotFoundException {
		FamilyMember familyMember = new FamilyMember();
		familyMember.setName(familyMemberRequest.getName());
		familyMember.setPhoneNumber(familyMemberRequest.getPhoneNumber());
		familyMember.setEmail(familyMemberRequest.getEmail());
		familyMember.setName(familyMemberRequest.getName());
		familyMember.setUsername(familyMemberRequest.getUsername());
		familyMember.setFamily(familyService.getFamilyById(familyMemberRequest.getFamilyId()));
		FamilyMember fm = familyMemeberService.addMember(familyMember);
		loggers.info("addmember");
		return new ResponseEntity<FamilyMember>(fm, HttpStatus.OK);
	}
	
	@PostMapping("/getmemberbyid")
	public ResponseEntity<FamilyMember> getFamilyMember(@RequestParam("id") Integer memberId) throws FamilyMemberNotFoundException {
		FamilyMember fm = familyMemeberService.getMember(memberId);
		loggers.info("getmember");
		return new ResponseEntity<FamilyMember>(fm, HttpStatus.OK);
	}
	
	@PostMapping("/getallmembersbyfamilyid")
	public ResponseEntity<List<FamilyMember>> getallmembers(@RequestBody FamilyId familyid) throws FamilyNotFoundException, FamilyMemberNotFoundException{
		Family family= familyService.getFamilyById(familyid.getFamilyId());
		List<FamilyMember> list= familyMemeberService.findByFamily(family);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	@PostMapping("/getmember")
	public ResponseEntity<FamilyMember> getFamilyMember(@RequestBody GetFamilyMemberRequest getFamilyMemberRequest) throws FamilyMemberNotFoundException
	{
		FamilyMember familyMember = familyMemeberService.getMember(getFamilyMemberRequest.getMemeberId());
		return new ResponseEntity<FamilyMember>(familyMember, HttpStatus.OK);
	}
	@PostMapping("/updatemember")
	public ResponseEntity<FamilyMember> updateFamilyMember(@RequestBody FamilyMemberRequest familyMemberRequest) throws FamilyNotFoundException, FamilyMemberNotFoundException {
		FamilyMember familyMember = familyMemeberService.getMember(familyMemberRequest.getFamilyId());
		familyMember.setName(familyMemberRequest.getName());
		familyMember.setPhoneNumber(familyMemberRequest.getPhoneNumber());
		familyMember.setEmail(familyMemberRequest.getEmail());
		familyMember.setName(familyMemberRequest.getName());
		familyMember.setUsername(familyMemberRequest.getUsername());
		familyMember.setFamily(familyService.getFamilyById(familyMemberRequest.getFamilyId()));
		FamilyMember fm = familyMemeberService.updateMember(familyMember);
		loggers.info("updatemember");
		return new ResponseEntity<FamilyMember>(fm, HttpStatus.OK);
	}
	
	//******************************************************************************************************
	
	@PostMapping("/addservice") 
	public ResponseEntity<MobileService> addMobileService(@RequestBody MobileServiceRequest msr) throws FamilyMemberNotFoundException {
		MobileService ms = new MobileService();
		ms.setFamilyMember(familyMemeberService.findByUsername(msr.getUsername()));
		ms.setPlanType(msr.getPlanType());
		if((Plans.UNLIMITED).equals(ms.getPlanType())) {
			ms.setStartDate(LocalDate.now());
			ms.setDataLimit("UNLIMITED");
			ms.setMonthlyFee(50.00);
		} else if(Plans.BASIC.equals(ms.getPlanType())) {
			ms.setStartDate(LocalDate.now());
			ms.setDataLimit("10GB");
			ms.setMonthlyFee(20.00);
		} else if(Plans.PREMIUM.equals(ms.getPlanType())) {
			ms.setStartDate(LocalDate.now());
			ms.setDataLimit("50GB");
			ms.setMonthlyFee(40.00);
		}
		mobileService.addMobileService(ms);
		loggers.info("addService");
		return new ResponseEntity<MobileService>(ms, HttpStatus.OK);
	}
	
	@PostMapping("/getallservices") 
	public ResponseEntity<List<MobileService>> getAllMobileService(@RequestBody FamilyId fId) throws FamilyNotFoundException, MobileServiceNotFoundException  {
		List<MobileService> list= mobileService.getallServices(fId.getFamilyId());
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	@PostMapping("/getservicebyid") 
	public ResponseEntity<MobileService> getMobileService(@RequestBody MobileServiceById fId) throws FamilyNotFoundException, MobileServiceNotFoundException  {
		MobileService ms= mobileService.getMobileService(fId.getServiceId());
		return new ResponseEntity<>(ms, HttpStatus.OK);
	}
	
	@PostMapping("/updateservice") 
	public ResponseEntity<MobileService> updateMobileService(@RequestBody UpdateMobileService req) throws FamilyNotFoundException, MobileServiceNotFoundException  {
		MobileService ms= mobileService.getMobileService(req.getServiceId());
		ms.setPlanType(req.getPlanType());
		if((Plans.UNLIMITED).equals(ms.getPlanType())) {
			ms.setStartDate(LocalDate.now());
			ms.setDataLimit("UNLIMITED");
			ms.setMonthlyFee(50.00);
		} else if(Plans.BASIC.equals(ms.getPlanType())) {
			ms.setStartDate(LocalDate.now());
			ms.setDataLimit("10GB");
			ms.setMonthlyFee(20.00);
		} else if(Plans.PREMIUM.equals(ms.getPlanType())) {
			ms.setStartDate(LocalDate.now());
			ms.setDataLimit("50GB");
			ms.setMonthlyFee(40.00);
		}
		MobileService m=mobileService.updateMobileService(ms) ;
		return new ResponseEntity<>(m, HttpStatus.OK);
	}
	
	
	//******************************************************************************
	
	@PostMapping("/getbillbyid")
	public ResponseEntity<Billing> getBill(@RequestParam("billId") Integer billId) throws BillingServiceNotFoundException
	{
		Billing bill=billingService.getBill(billId);
		loggers.info("getbill");
        return new ResponseEntity<>(bill,HttpStatus.OK);
	}
	
	@PostMapping("/getbill")
	public ResponseEntity<Billing> getBill(@RequestBody GetBillingRequest getBillingRequest) throws BillingServiceNotFoundException
	{
		Billing bill=billingService.getBill(getBillingRequest.getBillId());
		return new ResponseEntity<Billing>(bill, HttpStatus.OK);
	}
	
	@PostMapping("/getid")
	public ResponseEntity<Integer> getId(@RequestBody GetId getid) throws  FamilyNotFoundException
	{
		Integer familyId= familyService.getIdByUsername(getid.getUsername());
		return new ResponseEntity<Integer>(familyId, HttpStatus.OK);
	}
}
