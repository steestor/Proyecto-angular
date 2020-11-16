
using ITI.Core.Persistence.Repositories;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

using System.Security.Claims;
using Proyecto.Domain.Entities;

namespace Proyecto.Application.Identity
{
    public class RoleStore : RoleStoreBase<Role, int, UserRole, RoleClaim>
    {
        public RoleStore(IReadOnlyRepository<Role> readOnlyRepository, IRepository<Role, int> repository, IdentityErrorDescriber describer) : base(describer)
        {
            this.ReadOnlyRepository = readOnlyRepository;
            this.Repository = repository;
        }

        private IReadOnlyRepository<Role> ReadOnlyRepository { get; set; }

        public IRepository<Role, int> Repository { get; set; }

        public override IQueryable<Role> Roles => this.ReadOnlyRepository.GetAll();

        public override async Task<IdentityResult> CreateAsync(Role role, CancellationToken cancellationToken = default(CancellationToken))
        {
            await this.Repository.InsertAsync(role);

            return await Task.FromResult(IdentityResult.Success);
        }

        public override async Task<IdentityResult> UpdateAsync(Role role, CancellationToken cancellationToken = default(CancellationToken))
        {
            if (role == null)
            {
                throw new ArgumentNullException(nameof(role));
            }

            await this.Repository.UpdateAsync(role);

            return await Task.FromResult(IdentityResult.Success);
        }

        public async override Task<IdentityResult> DeleteAsync(Role role, CancellationToken cancellationToken = default(CancellationToken))
        {
            await this.Repository.DeleteAsync(role);

            return await Task.FromResult(IdentityResult.Success);
        }

        public override async Task<Role> FindByIdAsync(string id, CancellationToken cancellationToken = default(CancellationToken))
        {
            if (!int.TryParse(id,out var iId))
            {
                throw new InvalidOperationException("No se puede convertir el id a un valor entero");
            }
            Role role = await this.Repository.FirstOrDefaultAsync(x => x.Id == iId);

            return await Task.FromResult(role);
        }

        public override Task<Role> FindByNameAsync(string normalizedName, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.FromResult(this.ReadOnlyRepository.GetAll().FirstOrDefault(u => u.NormalizedName == normalizedName));
        }

        public override Task<IList<Claim>> GetClaimsAsync(Role role, CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public override async Task AddClaimAsync(Role role, Claim claim, CancellationToken cancellationToken = default(CancellationToken))
        {
            role.AddPermission(claim.Value, claim.Type);

            await this.Repository.UpdateAsync(role);

            await Task.FromResult(IdentityResult.Success);
        }

        public override Task RemoveClaimAsync(Role role, Claim claim, CancellationToken cancellationToken = default(CancellationToken))
        {
           return  Task.FromResult(IdentityResult.Success);
        }
    }
}
