using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TennisShopGuru.Models
{
  public enum CustomerDetailKey
  {
    EMAIL,
    CELL_PHONE,
    HOME_PHONE,
    WORK_PHONE,
    DATE_OF_BIRTH,
    ADDRESS,
    ADDRESS_SECONDARY,
    CITY,
    ZIP_CODE,
    STATE,
    MEMBER_NUMBER,
    MIDDLE_INITIAL
  }

  public class CustomerDetail : BaseEntity
  {
    public int Id { get; set; }
    public CustomerDetailKey Key { get; set; }
    public string Value { get; set; }

    public int CustomerID { get; set; }
    [ForeignKey("CustomerID")]
    public Customer Customer { get; set; }
  }
}
