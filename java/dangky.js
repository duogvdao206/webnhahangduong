import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;

public class RegistrationServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set response content type
        response.setContentType("text/html");

        // Retrieve form data
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String confirmPassword = request.getParameter("confirm-password");

        // Validate input
        if (username == null || username.trim().isEmpty() ||
            email == null || email.trim().isEmpty() ||
            password == null || password.trim().isEmpty() ||
            confirmPassword == null || confirmPassword.trim().isEmpty()) {

            response.sendRedirect("registration.html?error=All fields are required!");
            return;
        }

        if (!password.equals(confirmPassword)) {
            response.sendRedirect("registration.html?error=Passwords do not match!");
            return;
        }

        // Save user to database
        boolean isSaved = saveUserToDatabase(username, email, password);

        if (isSaved) {
            // Redirect to login page after successful registration
            response.sendRedirect("login.html");
        } else {
            response.sendRedirect("registration.html?error=Registration failed. Please try again later.");
        }
    }

    private boolean saveUserToDatabase(String username, String email, String password) {
        String jdbcUrl = "jdbc:mysql://localhost:3306/your_database";
        String dbUser = "root";
        String dbPassword = "password";

        try (Connection connection = DriverManager.getConnection(jdbcUrl, dbUser, dbPassword)) {
            String sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setString(1, username);
            statement.setString(2, email);
            statement.setString(3, password);
            int rowsInserted = statement.executeUpdate();
            return rowsInserted > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
