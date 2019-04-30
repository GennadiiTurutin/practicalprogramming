from rest_framework import viewsets
from .serializers import ProfileSerializer
from .models import Profile


# Cart - GET, POST
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
