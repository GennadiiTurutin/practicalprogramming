from django.db import models
from products.models import Product
from profiles.models import Profile
from uuid import uuid4

def generateUUID():
    return str(uuid4())

ORDER_STATUS_CHOICES = (
    ('created', 'Created'),
    ('paid', 'Paid'),
    ('shipped', 'Shipped'),
    ('refunded', 'Refunded'),
)

class Order(models.Model):
    order_number = models.CharField(max_length=36, unique=True, default=generateUUID, editable=False)
    profile      = models.ForeignKey(Profile, null=True, blank=True, on_delete=models.CASCADE)
    products     = models.ManyToManyField(Product, blank=True)
    status       = models.CharField(max_length=120, default='created', choices=ORDER_STATUS_CHOICES)
    subtotal     = models.DecimalField(default=5.99, max_digits=100, decimal_places=2)
    total        = models.DecimalField(default=0.00, max_digits=100, decimal_places=2) 
    timestamp    = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.order_number

