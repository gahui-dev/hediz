package com.charmd.hediz.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Alias("ReservationDTO")
public class ReservationDTO {
    private String cust_name;
    private String cust_phone;
    private int reserv_seq;
    private String reserv_request;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime reserv_time;
    private int reserv_stat;
    private int style_seq;
    private String style_name;
    private int staff_seq;
    private String staff_name;
    private int shop_seq;

}
