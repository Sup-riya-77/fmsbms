package com.project.fmsbms.service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.fmsbms.entities.Billing;
import com.project.fmsbms.entities.Family;
import com.project.fmsbms.entities.FamilyMember;
import com.project.fmsbms.entities.MobileService;
import com.project.fmsbms.exceptions.BillingServiceNotFoundException;
import com.project.fmsbms.exceptions.FamilyMemberNotFoundException;
import com.project.fmsbms.exceptions.MobileServiceNotFoundException;
import com.project.fmsbms.repositories.BillingRepositoty;
@Service
public class BillingServiceImpl implements BillingService {
	private static final Logger loggers = LoggerFactory.getLogger(BillingServiceImpl.class);

	@Autowired
	BillingRepositoty repo;
	
	@Autowired
	FamilyMemberService familyMemberService;
	
	@Autowired
	MobileServiceService mobileServiceService;
	
	@Override
	public Billing addBill(Billing bill) throws MobileServiceNotFoundException, FamilyMemberNotFoundException {
		LocalDate date=LocalDate.now();
		bill.setBillingPeriodStart(LocalDate.of(date.getYear(), date.getMonth(), 1));
		YearMonth yearMonth = YearMonth.of(date.getYear(), date.getMonth());
		LocalDate endDate = yearMonth.atEndOfMonth();
		bill.setBillingPeriodEnd(endDate);
		bill.setDueDate(endDate.plusDays(15));
		Family family= bill.getFamily();
		List<FamilyMember> familyMembers=familyMemberService.findByFamily(family);
		Double totalAmount=(double) 0;
		for(FamilyMember f : familyMembers)
		{
			MobileService ms=mobileServiceService.getByFamilyMember(f);
			totalAmount+=ms.getMonthlyFee();
		}
		bill.setAmount(totalAmount);
		bill.setPaid(false);
		loggers.info("addBill");
		return repo.save(bill);
	}

	@Override
	public Billing getBill(Integer billId) throws BillingServiceNotFoundException{
		Optional<Billing> b= repo.findById(billId);
		if(b.isPresent()) 
			{
			loggers.info("getBill");
			return b.get();
		   }
		
		else  throw new  BillingServiceNotFoundException("Bill Not Found Exception");
		
	}

	@Override
	public Billing updateBill(Billing bill) throws BillingServiceNotFoundException {
		Optional<Billing> b= repo.findById(bill.getBillId());
		if(b.isPresent()) 
		{
			Billing bb= repo.save(bill);
			loggers.info("updateBill");
			return bb;
			
		}
		else throw new  BillingServiceNotFoundException("Bill Not Found Exception");
	}

	@Override
	public java.util.List<Billing> getAllBills() throws BillingServiceNotFoundException {
		List<Billing> bills = (List<Billing>) repo.findAll();
		if(!bills.isEmpty()) return bills;
		else throw new  BillingServiceNotFoundException("Bill Not Found Exception");
	}

//	@Override
//	public java.util.List<Billing> getAllBillsById(Integer familyId) throws BillingServiceNotFoundException {
//		List<Billing> bills=  (List<Billing>) repo.findAll();
//		List<Billing> result= new ArrayList<>();
//		for(Billing b:bills)
//		{
//			if(b.getFamily().getFamilyId()==familyId)
//				result.add(b);
//		}
//		if(!result.isEmpty()) return result;
//		else throw new  BillingServiceNotFoundException("Bill Not Found Exception");
//	}

}
