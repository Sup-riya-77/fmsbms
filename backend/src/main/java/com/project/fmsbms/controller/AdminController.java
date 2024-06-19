package com.project.fmsbms.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.fmsbms.entities.CustomerSupport;
import com.project.fmsbms.entities.ERole;
import com.project.fmsbms.entities.Family;
import com.project.fmsbms.entities.FamilyMember;
import com.project.fmsbms.entities.MobileService;
import com.project.fmsbms.entities.Plans;
import com.project.fmsbms.entities.Role;
import com.project.fmsbms.entities.UserEntity;
import com.project.fmsbms.entities.request.GetFamilyRequest;
import com.project.fmsbms.entities.request.UpdateUserRole;
import com.project.fmsbms.exceptions.FamilyNotFoundException;
import com.project.fmsbms.exceptions.RoleNotFoundException;
import com.project.fmsbms.repositories.RoleRepository;
import com.project.fmsbms.service.CustomerSupportService;
import com.project.fmsbms.service.FamilyMemberService;
import com.project.fmsbms.service.FamilyService;
import com.project.fmsbms.service.MobileServiceService;
import com.project.fmsbms.service.RoleService;
import com.project.fmsbms.service.UserEntityService;

@RestController
@RequestMapping("/api/systemadmin")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminController {
	private static final Logger loggers = LoggerFactory.getLogger(AdminController.class);
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private FamilyMemberService familyMemberService;
	
	@Autowired
	private UserEntityService userEntityService;
	
	@Autowired
	private FamilyService familyService;
	
	@Autowired
	private MobileServiceService mobileService;
	
	@Autowired
	private CustomerSupportService customerSupportService;
	
	@Autowired
	private RoleService roleService;
	
	@PostMapping("/updateuserrole")
	public ResponseEntity<String> updateUserRole(@RequestBody UpdateUserRole updateRole) throws RoleNotFoundException {
		Optional<Role> r = roleService.findRoleByName(updateRole.role);
		String message = userEntityService.updateRole(updateRole.id, r.get());
		if((r.get().getName()).equals(ERole.ROLE_ACCOUNT_HOLDER)) {
			UserEntity user = userEntityService.findUserById(updateRole.id);
			Family family = new Family();
			family.setAccountHolderName(user.getName());
			family.setAddress(user.getAddress());
			family.setEmail(user.getEmail());
			family.setPassword(user.getPassword());
			family.setPhoneNumber(user.getPhoneNumber());
			family.setUsername(user.getUsername());
			familyService.addFamily(family);
			FamilyMember fm = new FamilyMember();
			fm.setFamily(family);
			fm.setEmail(family.getEmail());
			fm.setName(family.getAccountHolderName());
			fm.setPhoneNumber(family.getPhoneNumber());
			fm.setUsername(family.getUsername());
			familyMemberService.addMember(fm);
			MobileService ms = new MobileService();
			ms.setFamilyMember(fm);
			ms.setPlanType(Plans.UNLIMITED);
			ms.setMonthlyFee(50.00);
			ms.setStartDate(LocalDate.now());
			ms.setDataLimit("UNLIMITED");
			mobileService.addMobileService(ms);
		} else if(r.get().getName().equals(ERole.ROLE_CUSTOMER_SUPPORT)) {
			UserEntity user = userEntityService.findUserById(updateRole.id);
			CustomerSupport cs = new CustomerSupport();
			cs.setName(user.getName());
			cs.setAddress(user.getAddress());
			cs.setEmail(user.getEmail());
			cs.setPassword(user.getPassword());
			cs.setPhoneNumber(user.getPhoneNumber());
			customerSupportService.addCustomerSupport(cs);
		}
		loggers.info("Updating Username");
		return new ResponseEntity<String>(message, HttpStatus.OK);
	}
	
	@PostMapping("/familyupdate")
	public ResponseEntity<Family> updatefamilymethod(@RequestBody Family family) throws FamilyNotFoundException{
		loggers.info("familyupdate");
		UserEntity user = new UserEntity();
		user.setUsername(family.getUsername());
		user.setEmail(family.getEmail());
		user.setName(family.getAccountHolderName());
		user.setPhoneNumber(family.getPhoneNumber());
		Optional<Role> role = roleRepository.findByName(ERole.ROLE_ACCOUNT_HOLDER);
		user.setRole(role.get());
		user.setPassword(family.getPassword());
		user.setAddress(family.getAddress());
		return new ResponseEntity<Family>(family, HttpStatus.OK);
	}
	
	@PostMapping("/familygetbyid")
	public Family getfamilymethod(@RequestParam("Id") Integer familyid) throws FamilyNotFoundException{
		loggers.info("familygetbyid");
      return familyService.getFamilyById(familyid);
	}
	
	@PostMapping("/getfamily")
	public ResponseEntity<Family> getfamilymethod(@RequestBody GetFamilyRequest getFamilyRequest) throws FamilyNotFoundException {
		Family family = familyService.getFamilyById(getFamilyRequest.getFamilyId());
		return new ResponseEntity<Family>(family, HttpStatus.OK);
	}


	
	@GetMapping("/getalluserentities")
	public ResponseEntity<List<UserEntity>> getAllUserEntity()
	{
		List<UserEntity> users= userEntityService.getAllUserEntity();
		return new ResponseEntity<List<UserEntity>>(users, HttpStatus.OK);
	}
	
}	
