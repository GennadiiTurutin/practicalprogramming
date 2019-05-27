from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.Serializer):
    token = serializers.CharField()
    amount = serializers.DecimalField(decimal_places=2, max_digits=20, default=1.99)
    timestamp = serializers.DateTimeField()


