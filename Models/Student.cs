using System.ComponentModel.DataAnnotations;

namespace AspNetReactApp.Models
{
    public class Student
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(150)]
        public required string Name { get; set; }
        [Required]
        [StringLength(50)]
        public required string Course { get; set; }
    }
}
