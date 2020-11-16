﻿using ITI.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Proyecto.Domain.Entities
{
    public class Product : BaseEntity<int>
    {
        //public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public double Price { get; set; }

        public int Quantity { get; set; }
    }
}
