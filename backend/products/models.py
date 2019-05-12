from django.db import models
from categories.models import Category
from django.template.defaultfilters import slugify

class Product(models.Model):
    title           = models.CharField(max_length=60)
    description     = models.TextField()
    content         = models.TextField()
    category        = models.ForeignKey(Category, null=True, blank=True, on_delete=models.CASCADE)
    slug            = models.SlugField(unique=True, editable=False) 
    price           = models.DecimalField(decimal_places=2, max_digits=20, default=39.99)
    timestamp       = models.DateTimeField(auto_now_add=True)
    likes           = models.ManyToManyField('profiles.Profile', related_name='users', null=True, blank=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.title)

        super(Product, self).save(*args, **kwargs)