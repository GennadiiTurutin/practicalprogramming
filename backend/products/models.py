from django.db import models
from categories.models import Category

class Product(models.Model):
    id              = models.AutoField(primary_key=True)
    title           = models.CharField(max_length=120)
    category        = models.ForeignKey(Category, null=True, blank=True, on_delete=models.CASCADE)
    slug            = models.SlugField(blank=True, unique=True)
    description     = models.TextField()
    price           = models.DecimalField(decimal_places=2, max_digits=20, default=39.99)

    def __str__(self):
        return self.title