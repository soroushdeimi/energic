"""Pytest configuration: set up Django and the test database without pytest-django."""

from __future__ import annotations

import os
from typing import Any

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.dev")

import django  # noqa: E402

django.setup()

import pytest  # noqa: E402
from django.test.runner import DiscoverRunner  # noqa: E402
from django.test.utils import setup_test_environment  # noqa: E402

_state: dict[str, Any] = {}


def pytest_configure(config: pytest.Config) -> None:
    setup_test_environment()
    runner = DiscoverRunner(interactive=False, verbosity=0)
    _state["old_config"] = runner.setup_databases()
    _state["runner"] = runner


def pytest_unconfigure(config: pytest.Config) -> None:
    if "runner" in _state:
        _state["runner"].teardown_databases(_state["old_config"])
