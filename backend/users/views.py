from rest_framework import viewsets
from .serializers import UserSerializer
from .models import User


# Cart - GET, POST
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
