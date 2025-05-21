import supabase, { subabaseUrl } from "./supabase";

export const login = async ({ email, password }) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error("User can't logged in successfully");
  }

  return data;
};

export const getUser = async () => {
  const { data: session, error } = await supabase.auth.getSession();

  if (!session.session) {
    throw new Error("User can't logged in successfully");
  }
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) {
    throw new Error("User can't logged in successfully");
  }

  return user.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error("User can't logged in successfully");
  }

  return;
};

export const signup = async ({ email, password, fullName }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        avatar_url: "",
      },
    },
  });

  if (error) {
    throw new Error("User can't signed up successfully");
  }

  return data;
};

export const updateUserData = async ({ password, fullName, avatar }) => {
  let userData = {};
  if (password) {
    userData.password = password;
  }
  if (fullName) {
    userData.data = { full_name: fullName };
  }

  const { data, error } = await supabase.auth.updateUser({
    ...userData,
  });

  if (error) {
    throw new Error("User can't updated successfully");
  }

  if (!avatar) {
    return;
  }

  const avatarName = Math.random().toString(36).substring(7) + avatar.name;

  const { error: avatarUploadError } = await supabase.storage
    .from("avatars")
    .upload(avatarName, avatar);

  if (avatarUploadError) {
    throw new Error("Avatar can't uploaded successfully");
  }

  const avatarUrl = `${subabaseUrl}/storage/v1/object/public/avatars//${avatarName}`;

  const { error: userError } = await supabase.auth.updateUser({
    data: { avatar_url: avatarUrl },
  });

  if (userError) {
    throw new Error("Avatar can't updated successfully");
  }
};
