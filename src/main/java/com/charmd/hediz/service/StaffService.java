package com.charmd.hediz.service;

import com.charmd.hediz.dto.StaffDTO;

import java.util.List;

public interface StaffService {
    public StaffDTO staffFind(int staff_seq);
    public List<StaffDTO> staffFindAll();
    public int staffUpdate(StaffDTO putData);
    public int staffAdd(StaffDTO postData);
    public int staffDelete(int staff_seq);
}
