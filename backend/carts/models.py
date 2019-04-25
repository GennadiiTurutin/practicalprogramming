from django.db import models

from products.models import Product
from users.models import User


class Cart(models.Model):
    id              = models.AutoField(primary_key=True)
    user        = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    products    = models.ManyToManyField(Product, blank=True)
    total       = models.DecimalField(default=0.00, max_digits=100, decimal_places=2)
    timestamp   = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return str(self.id)
