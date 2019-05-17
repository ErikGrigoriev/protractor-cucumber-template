@template
Feature: Check Template functionality

  Scenario: User logs into the system
    Given user opens page
    Then templates page is displayed


  Scenario: User creates Template
    When user creates template
    Then template is created

  Scenario: User activates Template
    When user activates template
    Then template is activated

  Scenario: User deletes Template
    When user deletes template
    Then template is deleted

  Scenario: User logs out off the system
    When user logs out
    Then log in page is displayed