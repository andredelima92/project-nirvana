using System.ComponentModel.DataAnnotations;

namespace server.Dtos
{
    public class TravelUpdateDto
    {   
        [Required(ErrorMessage = "Campo nome é obrigatorio")]
        public string Name {get; set;}
        
        [Required(ErrorMessage = "Campo uf é obrigatorio")]
        [MaxLength(2, ErrorMessage = "UF não pode ter mais do que 2 caracteres")]
        public string Uf {get; set;}

        [Required(ErrorMessage = "Campo cidade é obrigatorio")]
        public string City {get; set;}

        [Required(ErrorMessage = "Campo referência é obrigatorio")]
        public string Reference {get; set;}

        [Required(ErrorMessage = "Campo descrição é obrigatorio")]
        [MaxLength(100, ErrorMessage = "Campo descrição não pode ter mais do que 100 caracteres")]
        public string Description {get; set;}
    }
}