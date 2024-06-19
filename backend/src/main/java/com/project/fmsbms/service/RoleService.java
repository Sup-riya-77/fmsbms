package com.project.fmsbms.service;

import java.util.Optional;

import com.project.fmsbms.entities.ERole;
import com.project.fmsbms.entities.Role;
import com.project.fmsbms.exceptions.RoleNotFoundException;

public interface RoleService {

	public Optional<Role> findRoleByName(ERole role) throws RoleNotFoundException;

	public Optional<Role> findRoleById(Integer id) throws RoleNotFoundException;

}
