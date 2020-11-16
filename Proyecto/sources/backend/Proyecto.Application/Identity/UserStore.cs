using ITI.Core.Domain.Entities.Security;
using ITI.Core.Persistence.Repositories;
using Proyecto.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Proyecto.Application.Identity
{
    public class UserStore : UserStoreBase<User, Role, int, UserClaim, UserRole, UserLogin, UserToken, RoleClaim>
    {
        private IReadOnlyRepository<User> ReadOnlyRepository { get; set; }

        private IReadOnlyRepository<UserRole> AppUserRoleReadOnlyRepository { get; set; }

        private IReadOnlyRepository<Role> RolesReadOnlyRepository { get; set; }
        private IRepository<User, int> Repository { get; set; }

        private RoleManager<Role> RoleManager { get; set; }


        public UserStore(IReadOnlyRepository<Role> rolesReadOnlyRepository, IReadOnlyRepository<UserRole> appUserRoleReadOnlyRepository, RoleManager<Role> roleManager, IReadOnlyRepository<User> readOnlyRepository, IRepository<User, int> repository, IdentityErrorDescriber describer) : base(describer)
        {
            this.ReadOnlyRepository = readOnlyRepository;
            this.Repository = repository;
            this.RoleManager = roleManager;
            this.AppUserRoleReadOnlyRepository = appUserRoleReadOnlyRepository;
            this.RolesReadOnlyRepository = rolesReadOnlyRepository;
        }

        public override IQueryable<User> Users => this.ReadOnlyRepository.GetAll();

        public override Task AddClaimsAsync(User user, IEnumerable<Claim> claims, CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public override Task AddLoginAsync(User user, UserLoginInfo login, CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public override Task SetSecurityStampAsync(User user, string stamp, CancellationToken cancellationToken = default(CancellationToken))
        {

            return base.SetSecurityStampAsync(user, stamp, cancellationToken);
        }

        public override Task<string> GetSecurityStampAsync(User user, CancellationToken cancellationToken = default(CancellationToken))
        {
            return base.GetSecurityStampAsync(user, cancellationToken);
        }
        public override async Task AddToRoleAsync(User user, string normalizedRoleName, CancellationToken cancellationToken = default(CancellationToken))
        {
            Role rol = await RoleManager.FindByNameAsync(normalizedRoleName);

            if (rol == null)
            {
                throw new DataException("No existe el rol con nombre :" + normalizedRoleName);
            }

            user.AnyadirRol(rol);


            await Repository.UpdateAsync(user);

            await Task.FromResult(IdentityResult.Success);
        }

        public override async Task<IdentityResult> CreateAsync(User user, CancellationToken cancellationToken = default(CancellationToken))
        {

            await this.Repository.InsertAsync(user);

            return await Task.FromResult(IdentityResult.Success);
        }

        public override async Task<IdentityResult> DeleteAsync(User user, CancellationToken cancellationToken = default(CancellationToken))
        {
            await this.Repository.DeleteAsync(user);

            return await Task.FromResult(IdentityResult.Success);
        }

        public override Task<User> FindByEmailAsync(string normalizedEmail, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.FromResult(this.ReadOnlyRepository.GetAll().FirstOrDefault(u => u.Email == normalizedEmail));
        }

        public override async Task<User> FindByIdAsync(string userId, CancellationToken cancellationToken = default(CancellationToken))
        {
            var a = ConvertIdFromString(userId);
            User user = await this.Repository.FirstOrDefaultAsync(x => x.Id == a);

            return await Task.FromResult(user);
        }

        public override Task<User> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.FromResult(this.ReadOnlyRepository.GetAll().FirstOrDefault(u => u.NormalizedUserName == normalizedUserName));
        }

        public override Task<IList<Claim>> GetClaimsAsync(User user, CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public override Task<IList<UserLoginInfo>> GetLoginsAsync(User user, CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public override async Task<IList<string>> GetRolesAsync(User user, CancellationToken cancellationToken = default(CancellationToken))
        {

            var roles = AppUserRoleReadOnlyRepository.GetAll().Where(x => x.UserId == user.Id).Select(x => x.RoleId).ToArray();

            return await Task.FromResult(RolesReadOnlyRepository.GetAll().Where(x => roles.Contains(x.Id)).Select(x => x.NormalizedName).ToList());


        }

        public override Task<IList<User>> GetUsersForClaimAsync(Claim claim, CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public override async Task<IList<User>> GetUsersInRoleAsync(string normalizedRoleName, CancellationToken cancellationToken = default(CancellationToken))
        {
            Role rol = await RoleManager.FindByNameAsync(normalizedRoleName);

            if (rol == null)
            {
                throw new DataException("No existe el rol con nombre :" + normalizedRoleName);
            }

            var usersId = AppUserRoleReadOnlyRepository.GetAll().Where(x => x.RoleId == rol.Id).Select(x => x.UserId).ToArray();

            var users = this.ReadOnlyRepository.GetAll().Where(x => usersId.Contains(x.Id));

            return users.ToList();
        }

        public override async Task<bool> IsInRoleAsync(User user, string normalizedRoleName, CancellationToken cancellationToken = default(CancellationToken))
        {
            Role rol = await RoleManager.FindByNameAsync(normalizedRoleName);

            if (rol == null)
            {
                throw new DataException("No existe el rol con nombre :" + normalizedRoleName);
            }

            if (user.Roles == null)
            {
                return false;
            }

            return user.Roles.Any(x => x.RoleId == rol.Id);
        }

        public override Task RemoveClaimsAsync(User user, IEnumerable<Claim> claims, CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public override Task RemoveFromRoleAsync(User user, string normalizedRoleName, CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public override Task RemoveLoginAsync(User user, string loginProvider, string providerKey, CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public override Task ReplaceClaimAsync(User user, Claim claim, Claim newClaim, CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public override async Task<IdentityResult> UpdateAsync(User user, CancellationToken cancellationToken = default(CancellationToken))
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            await this.Repository.UpdateAsync(user);

            return await Task.FromResult(IdentityResult.Success);
        }

        protected override Task AddUserTokenAsync(UserToken token)
        {
            throw new NotImplementedException();
        }

        protected override Task<Role> FindRoleAsync(string normalizedRoleName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        protected override Task<UserToken> FindTokenAsync(User user, string loginProvider, string name, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }


        protected override Task<UserLogin> FindUserLoginAsync(string loginProvider, string providerKey, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }



        protected override Task RemoveUserTokenAsync(UserToken token)
        {
            throw new NotImplementedException();
        }

        protected override Task<UserRole> FindUserRoleAsync(int userId, int roleId, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        protected override Task<User> FindUserAsync(int userId, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        protected override Task<UserLogin> FindUserLoginAsync(int userId, string loginProvider, string providerKey, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
