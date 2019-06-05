from django.db import models

class Payment(models.Model):
    token =  models.CharField(max_length=60)
    amount = models.DecimalField(decimal_places=2, max_digits=20, default=1.00)
    timestamp = models.DateTimeField(auto_now_add=True)

