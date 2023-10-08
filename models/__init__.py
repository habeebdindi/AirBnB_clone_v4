#!/usr/bin/python3
"""
initialize the models package
"""
# __init__.py

from os import getenv


storage_t = getenv("HBNB_TYPE_STORAGE")

from models.state import State
from models.city import City
from models.user import User
from models.place import Place
from models.amenity import Amenity
from models.review import Review

if storage_t == "db":
    from models.engine.db_storage import DBStorage
    storage = DBStorage()
else:
    from models.engine.file_storage import FileStorage
    storage = FileStorage()
storage.reload()
