from rest_framework import viewsets
from .serializers import OrderSerializer
from .models import Order


# Cart - GET, POST
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
