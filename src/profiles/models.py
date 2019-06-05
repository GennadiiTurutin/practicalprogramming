from django.db import models
from products.models import Product
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user')
    products = models.ManyToManyField(Product, related_name='products')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username

