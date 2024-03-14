namespace Food_Journal.Models
{
    public class User
    {
        public Guid Id { get; init; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public UserParametrs? UserParametrs { get; set; }
    }

    public class UserParametrs
    {
        public Guid Id { get; init; }
        public int Age { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public int Gender { get; set; }
        public int Activity { get; set; }
        public int Goal { get; set; }

    }

    public class UserParametrsRequest
    {
        public int Age { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public int Gender { get; set; }
        public int Activity { get; set; }
        public int Goal { get; set; }
    }
}
