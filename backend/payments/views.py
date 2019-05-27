from rest_framework import viewsets
from .serializers import PaymentSerializer
from rest_framework.response import Response
from rest_framework import generics
from .models import Payment
from keys import *
import stripe
import os

stripe.api_key = STRIPE_SECRET_KEY

# Cart - GET, POST
class PaymentView(generics.GenericAPIView):
    serializer_class = PaymentSerializer

    def post(self, request, *args, **kwargs):
	    serializer = self.get_serializer(data=request.data)
	    token = request.data['token'] 
	    amount = int(request.data['amount'])*50
	    charge = stripe.Charge.create(
	        amount=amount,
	        currency='usd',
	        description='Praktikum.com Educational Services',
	        source=token,
	    )
	    return Response({"Success"})

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer