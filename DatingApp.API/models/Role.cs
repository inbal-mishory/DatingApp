using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace DatingApp.API.models
{
    public class Role : IdentityRole<int>
    {
        public ICollection<UserRole> UserRoles { get; set; }
    }
}