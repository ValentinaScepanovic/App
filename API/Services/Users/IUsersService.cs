using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Services.Users
{
    public interface IUsersService
    {
        void SignIn(UserDto user);
        Task<UserDto> Login (LoginDto loginDto);
    }
}