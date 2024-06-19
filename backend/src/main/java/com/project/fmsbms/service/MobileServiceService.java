package com.project.fmsbms.service;

import java.util.List;

import com.project.fmsbms.entities.FamilyMember;
import com.project.fmsbms.entities.MobileService;
import com.project.fmsbms.exceptions.FamilyNotFoundException;
import com.project.fmsbms.exceptions.MobileServiceNotFoundException;

public interface MobileServiceService {
	public MobileService addMobileService(MobileService ms);

	public MobileService getMobileService(Integer id) throws MobileServiceNotFoundException;

	public MobileService updateMobileService(MobileService ms) throws MobileServiceNotFoundException;

	public MobileService getByFamilyMember(FamilyMember familyMember) throws MobileServiceNotFoundException;
	
	public List<MobileService> getallServices(Integer familyId) throws FamilyNotFoundException,MobileServiceNotFoundException;
}
