from django.db import models

class User(models.Model):
    email       = models.EmailField(max_length=255, unique=True)
    first_name   = models.CharField(max_length=255, blank=True, null=True)
    second_name   = models.CharField(max_length=255, blank=True, null=True)
    address   = models.CharField(max_length=255, blank=True, null=True)
    timestamp   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
