namespace Food_Journal.Models
{
    public class User
    {
        public Guid Id { get; init; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
